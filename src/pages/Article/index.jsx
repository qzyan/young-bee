import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import defaultAvatar from '../../assets/avatar.png';
import Comments from '../../containers/Comments';
import './index.css';


export default function Article(props) {
  const { state } = useLocation();
  const { articleId } = useParams();
  const [article, setArticle] = useState({})


  // if it was routed from a navlink - get the article from the state diretly
  // else send a ajax to get the article info
  useEffect(() => {
    if (state) {
      var { article } = state;
      setArticle(article);
      return;
    }

    getArticle();

    async function getArticle() {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/articles/${articleId}`;
        const res = await axios.get(url);
        var { data: { article } } = res;
        setArticle(article);
      } catch (err) {
        console.log(err)
      }
    };
  }, [])


  const { title, body, tagList=[], commentList=[], createdAt, updatedAt, favoritesCount, author } = article;

  if (author) {
    var { image, username } = author;
  }

  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{title}</h1>

          <div className="article-meta">
            <a href=""><img src={image || defaultAvatar} /></a>
            <div className="info">
              <a href="" className="author">{username}</a>
              <span className="date">{`Posted on ${new Date(createdAt).toDateString()}`}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              Follow {username}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              Favorite Post <span className="counter">({favoritesCount})</span>
            </button>
          </div>

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
          <div className="article-meta">
            <a href="profile.html"><img src={image || defaultAvatar} /></a>
            <div className="info">
              <a href="" className="author">{username}</a>
              <span className="date">{`Posted on ${new Date(createdAt).toDateString()}`}</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>

        <Comments articleId={articleId} commentList={commentList} />

      </div>

    </div>
  )

}