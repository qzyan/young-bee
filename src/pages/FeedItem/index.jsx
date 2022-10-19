/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import defaultAvatar from '../../assets/avatar.png';

export default function FeedItem(props) {
  const { article, currUser } = props;
  // eslint-disable-next-line max-len, object-curly-newline
  const { _id: articleId, title, description, createdAt, favorited, favoritesCount, tagList, author: { username, image } } = article;
  const [isFavorited, setIsFavorited] = useState(favorited);
  const favCountEl = useRef(null);

  async function handleToggleFavorite(e) {
    e.currentTarget.blur();
    // require to be logged in
    if (!currUser) {
      alert('Please log in');
      return;
    }

    try {
      // send ajax request to toggle favoite
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const url = `${BASE_URL}/articles/${articleId}/favorite`;

      // currently favorited, send request to unfavorite
      if (isFavorited) {
        await axios.delete(url, {
          headers: {
            Authentication: `Bearer: ${currUser.token}`,
          },
        });
        // toggle the ui
        favCountEl.current.innerText = parseInt(favCountEl.current.innerText, 10) - 1;
        setIsFavorited(false);
        return;
      }

      // currently unfavorited, send request to favorite
      await axios.post(url, {}, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      });
      // toggle the ui
      setIsFavorited(true);
      favCountEl.current.innerText = parseInt(favCountEl.current.innerText, 10) + 1;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <NavLink to={`/profile/${username}`}><img alt="avatar" src={image || defaultAvatar} /></NavLink>
        <div className="info">
          <NavLink to={`/profile/${username}`} className="author">{username}</NavLink>
          <span className="date">
            <TimeAgo datetime={createdAt} />
          </span>
        </div>
        <button
          type="button"
          className={`btn btn-outline-primary btn-sm pull-xs-right ${(isFavorited ? 'active' : '')}`}
          onClick={handleToggleFavorite}
        >
          <i className="ion-heart" />
          <span ref={favCountEl}>{favoritesCount}</span>
        </button>
      </div>
      <Link to={`/article/${articleId}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
      <ul className="tag-list pull-xs-right">
        {tagList.map((tag, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <a href="/" key={index} className="tag-default tag-pill tag-outline">
            {tag}
          </a>
        ))}
      </ul>
    </div>
  );
}
