import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import defaultAvatar from '../../assets/avatar.png';
import './index.css';

function Comments(props) {
  const { currUser, articleId } = props;
  const [comments, setComments] = useState([]);
  const inputEl = useRef(null);

  if (currUser) {
    var { image, username } = currUser
  }

  // send ajax to get comments when component mounted
  useEffect(() => {

    getComments();

    async function getComments() {
      try{
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/articles/${articleId}/comments`;
        const res = await axios.get(url);
        var { data: { comments } } = res;
        setComments(comments);
      }catch(err) {
        console.log(err)
      }
    };
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const body = inputEl.current.value;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    axios.post(`${BASE_URL}/articles/${articleId}/comments`, { comment: { body } }, {
      headers: {
        'Authentication': `Bearer: ${currUser.token}`
      }
    })
      .then(res => {
        const { comment } = res.data;
        const newComments = [comment, ...comments];
        setComments(newComments)
        inputEl.current.value = ''
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (

    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {currUser ?
          <form className="card comment-form"
            onSubmit={handleSubmit}>
            <div className="card-block">
              <textarea ref={inputEl} className="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div className="card-footer">
              {currUser
                ? <img src={image || defaultAvatar} className="comment-author-img" />
                : null
              }
              <button className="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form> :
          <Link to="/login">
            <div className="card">
              <div className="card-block">
                <p className="card-text">What are Your thoughts?</p>
              </div>
            </div>
          </Link>
        }

        {comments.map((comment) => <CommentItem key={comment._id} comment={comment} currUser={currUser} />)}

      </div>

    </div>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(Comments)