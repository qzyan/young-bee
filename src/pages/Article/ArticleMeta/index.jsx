import React from 'react';
import axios from 'axios';
import defaultAvatar from '../../../assets/avatar.png';

export default function ArticleMeta(props) {
  // eslint-disable-next-line max-len, react/prop-types, object-curly-newline
  const { username, createdAt, favoritesCount, image, handleToggleFavorite, isFavorited, isFollowing, currUser } = props;

  const handleFollow = () => {
    if (!currUser) {
      alert('need login');
      return;
    }
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/profiles/${username}/follow`;
    axios.post(url, {}, {
      headers: {
        // eslint-disable-next-line react/prop-types
        Authentication: `Bearer: ${currUser.token}`,
      },
    })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="article-meta">
      <a href="/"><img src={image || defaultAvatar} alt="avatar" /></a>
      <div className="info">
        <a href="/" className="author">{username}</a>
        <span className="date">{`Posted on ${new Date(createdAt).toDateString()}`}</span>
      </div>
      <button
        onClick={handleFollow}
        className={`btn btn-sm btn-outline-secondary ${(isFollowing ? 'active' : '')}`}
        type="button"
      >
        <i className="ion-plus-round" />
        &nbsp;
        Follow&nbsp;
        {username}
      </button>
      &nbsp;&nbsp;
      <button
        className={`btn btn-sm btn-outline-primary ${(isFavorited ? 'active' : '')}`}
        onClick={handleToggleFavorite}
        type="button"
      >
        <i className="ion-heart" />
        &nbsp;
        Favorite Post&nbsp;
        <span className="counter">
          {favoritesCount}
        </span>
      </button>
    </div>
  );
}
