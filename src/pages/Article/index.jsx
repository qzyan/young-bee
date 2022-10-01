import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Comments from '../../containers/Comments';
import ArticleMeta from './ArticleMeta';
import './index.css';


function Article(props) {
  const { currUser } = props;
  const { articleId } = useParams();
  const [article, setArticle] = useState({})
  let { title, body, tagList = [], createdAt, updatedAt, favorited, favoritesCount: initFavCount, author } = article;
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0)
  // else send a ajax to get the article info when component mounted
  useEffect(() => {
    getArticle();

    async function getArticle() {
      try {
        if (currUser) {
          var { token } = currUser
        }

        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/articles/${articleId}`;
        const res = await axios.get(url,
          {
            headers: {
              'Authentication': `Bearer: ${token}`
            }
          }
          );
        var { data: { article } } = res;
        setArticle(article);
      } catch (err) {
        console.log(err)
      }
    };
  }, []);

  //todo: figure out the isfavorited both server side and client
  //when article is updated, update the isFavorited and favoritesCount state
  useEffect(() => {
    const { favorited, favoritesCount } = article;
    setIsFavorited(favorited);
    setFavoritesCount(favoritesCount);
  }, [article])

  async function handleToggleFavorite(e) {
    e.currentTarget.blur()
    // require to be logged in
    if (!currUser) {
      return
    }

    try {
      // send ajax request to toggle favoite
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const url = `${BASE_URL}/articles/${articleId}/favorite`;
      await axios.post(url, {}, {
        headers: {
          'Authentication': `Bearer: ${currUser.token}`
        }
      });

      // toggle the ui
      if (isFavorited) {
        setFavoritesCount(favoritesCount - 1)
        setIsFavorited(false)
        return;
      }

      setIsFavorited(true)
      setFavoritesCount(favoritesCount + 1)
    }
    catch (err) {
      console.log(err)
    }

  };

  if (author) {
    var { image, username } = author;
  }

  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">
          <h1>{title}</h1>

          <ArticleMeta username={username} createdAt={createdAt} favoritesCount={favoritesCount} image={image} isFavorited={isFavorited} handleToggleFavorite={handleToggleFavorite} />
        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">

            <div className="article-body">
              <ReactMarkdown>
                {body}
              </ReactMarkdown>
              <p className="font-italic text-sm-right"><small>Last updated at  {new Date(updatedAt).toDateString()}</small></p>
            </div>

            <ul className="tag-list" >
              {tagList.map((tag, index) => (
                <a href="" key={index} className="tag-default tag-pill tag-outline" >
                  {tag}
                </a>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta username={username} createdAt={createdAt} favoritesCount={favoritesCount} image={image} isFavorited={isFavorited} handleToggleFavorite={handleToggleFavorite} />
        </div>

        <Comments articleId={articleId} />

      </div>

    </div>
  )

}

export default connect((state) => ({ currUser: state.currUser }), {})(Article)