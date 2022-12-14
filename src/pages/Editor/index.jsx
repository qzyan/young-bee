/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Editor(props) {
  const { currUser } = props;
  const [article, setArticle] = useState({});
  const { state } = useLocation();
  const { article: prevArticle } = state || {};
  const navigate = useNavigate();
  const { articleId } = useParams();

  function collectData(e, dataType) {
    const { value } = e.target;
    if (dataType === 'tags') {
      const reg = /\s+/;
      const tagList = [...new Set(value.trim().split(reg))];
      setArticle({ ...article, tagList });
      return;
    }
    setArticle({ ...article, [dataType]: value });
  }
  // send the ajax post request to create a new article or update an article
  function handleSubmit(e) {
    e.preventDefault();
    if (!currUser) {
      alert('Please Login');
      return;
    }
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // update article
    if (prevArticle) {
      axios.put(`${BASE_URL}/articles/${articleId}`, { article }, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      })
        .then(() => {
          // console.log(res);
          // jump to the home
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios.post(`${BASE_URL}/articles`, { article }, {
      headers: {
        Authentication: `Bearer: ${currUser.token}`,
      },
    })
      .then(() => {
        // console.log(res);
        // jump to the home
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="editor-page" id="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    required
                    onChange={(e) => collectData(e, 'title')}
                    defaultValue={prevArticle ? prevArticle.title : ''}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    required
                    onChange={(e) => collectData(e, 'description')}
                    defaultValue={prevArticle ? prevArticle.description : ''}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    required
                    onChange={(e) => collectData(e, 'body')}
                    defaultValue={prevArticle ? prevArticle.body : ''}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags divided by space"
                    onChange={(e) => collectData(e, 'tags')}
                    defaultValue={prevArticle ? prevArticle.tagList.join(' ') : ''}
                  />
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  {prevArticle ? 'Update Article' : 'Publish Article'}
                </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(Editor);
