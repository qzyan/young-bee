/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Comments from '../../containers/Comments';
import ArticleMeta from './ArticleMeta';
import LoginDialogSlide from '../../components/LoginDialogSlide';
import './index.css';

function Article(props) {
  const { currUser } = props;
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  // eslint-disable-next-line object-curly-newline
  const { title, body, tagList = [], createdAt, updatedAt, author = {} } = article;
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  // dialog modal is open or not
  const [open, setOpen] = React.useState(false);

  // else send a ajax to get the article info when component mounted
  useEffect(() => {
    async function getArticle() {
      try {
        const token = currUser ? currUser.token : null;

        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/articles/${articleId}`;
        const params = token ? {
          headers: {
            Authentication: `Bearer: ${token}`,
          },
        }
          : {};
        const res = await axios.get(url, params);
        const { data: { article: artic } } = res;
        setArticle(artic);
      } catch (err) {
        console.log(err);
      }
    }

    getArticle();
  }, [currUser]);

  // when article is updated, update the isFavorited and favoritesCount state
  useEffect(() => {
    setIsFavorited(article.favorited);
    setFavoritesCount(article.favoritesCount);
    setIsFollowing(article.author ? article.author.following : false);
  }, [article]);

  return (
    <>
      <LoginDialogSlide open={open} setOpen={setOpen} />
      <div className="article-page">

        <div className="banner">
          <div className="container">
            <h1>{title}</h1>

            <ArticleMeta
              username={author.username}
              image={author.image}
              createdAt={createdAt}
              favoritesCount={favoritesCount}
              isFavorited={isFavorited}
              isFollowing={isFollowing}
              setIsFavorited={setIsFavorited}
              setFavoritesCount={setFavoritesCount}
              setIsFollowing={setIsFollowing}
              currUser={currUser}
              articleId={articleId}
              article={article}
              setOpen={setOpen}
            />
          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-md-12">

              <div className="article-body">
                <ReactMarkdown>
                  {body}
                </ReactMarkdown>
                <p className="font-italic text-sm-right">
                  <small>
                    {'Last updated at '}
                    {new Date(updatedAt).toDateString()}
                  </small>
                </p>
              </div>

              <ul className="tag-list">
                {tagList.map((tag, index) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid, react/no-array-index-key
                  <a href="" key={index} className="tag-default tag-pill tag-outline">
                    {tag}
                  </a>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <ArticleMeta
              username={author.username}
              image={author.image}
              createdAt={createdAt}
              favoritesCount={favoritesCount}
              isFavorited={isFavorited}
              isFollowing={isFollowing}
              setIsFavorited={setIsFavorited}
              setFavoritesCount={setFavoritesCount}
              setIsFollowing={setIsFollowing}
              currUser={currUser}
              articleId={articleId}
              article={article}
              setOpen={setOpen}
            />
          </div>

          <Comments articleId={articleId} setOpen={setOpen} />

        </div>

      </div>
    </>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(Article);
