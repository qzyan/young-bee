/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import defaultAvatar from '../../../assets/avatar.png';

export default function ArticleMeta(props) {
  // eslint-disable-next-line max-len, react/prop-types, object-curly-newline
  const { username, createdAt, favoritesCount, image, isFavorited, isFollowing, setIsFavorited, setFavoritesCount, setIsFollowing, currUser, articleId } = props;

  const handleFollow = () => {
    // auth required
    if (!currUser) {
      alert('need login');
      return;
    }

    // send ajax follow request
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/profiles/${username}/follow`;
    // currently following the author, send ajax request to unfollow
    if (isFollowing) {
      axios.delete(url, {
        headers: {
          // eslint-disable-next-line react/prop-types
          Authentication: `Bearer: ${currUser.token}`,
        },
      })
        .then(() => {
          setIsFollowing(!isFollowing);
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }

    axios.post(url, {}, {
      headers: {
        // eslint-disable-next-line react/prop-types
        Authentication: `Bearer: ${currUser.token}`,
      },
    })
      .then(() => {
        setIsFollowing(!isFollowing);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleToggleFavorite = async (e) => {
    e.currentTarget.blur();
    // require to be logged in
    if (!currUser) {
      return;
    }

    try {
      // send ajax request to toggle favoite
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const url = `${BASE_URL}/articles/${articleId}/favorite`;
      await axios.post(url, {}, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      });

      // toggle the ui
      if (isFavorited) {
        setFavoritesCount(favoritesCount - 1);
        setIsFavorited(false);
        return;
      }

      setIsFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    } catch (err) {
      console.log(err);
    }
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
        {isFollowing ? 'Unfollow' : 'Follow'}
        &nbsp;
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
        {isFavorited ? 'UnFavorite ' : 'Favorite '}
        Post&nbsp;
        <span className="counter">
          {favoritesCount}
        </span>
      </button>
    </div>
  );
}
