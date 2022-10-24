/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { openSigninDialog } from '../../../redux/actions/dialog';
import defaultAvatar from '../../../assets/avatar.png';

function ArticleMeta(props) {
  // eslint-disable-next-line max-len, react/prop-types, object-curly-newline
  const { username, createdAt, favoritesCount, image, isFavorited, isFollowing, setIsFavorited, setFavoritesCount, setIsFollowing, currUser, articleId, article, setOpen } = props;
  const navigate = useNavigate();

  const handleFollow = () => {
    // auth required
    if (!currUser) {
      setOpen(true);
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

  const handleDelete = async () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles/${articleId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      });
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleFavorite = async (e) => {
    e.currentTarget.blur();
    // require to be logged in
    if (!currUser) {
      setOpen();
      return;
    }

    try {
      // send ajax request to toggle favoite
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const url = `${BASE_URL}/articles/${articleId}/favorite`;

      // currently favorited, send ajax request to unfavoirte
      if (isFavorited) {
        await axios.delete(url, {
          headers: {
            Authentication: `Bearer: ${currUser.token}`,
          },
        });

        // toggle the ui
        setFavoritesCount(favoritesCount - 1);
        setIsFavorited(false);
        return;
      }

      // currently unfavorited, send ajax request to favoirte
      await axios.post(url, {}, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      });

      setIsFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="article-meta">
      <Link to={`/profile/${username}`}><img src={image || defaultAvatar} alt="avatar" /></Link>
      <div className="info">
        <Link to={`/profile/${username}`} className="author">{username}</Link>
        <span className="date">{`Posted on ${new Date(createdAt).toDateString()}`}</span>
      </div>
      {currUser && currUser.username === username
        ? (
          <>
            <Link
              className="btn btn-sm btn-outline-secondary"
              to="./update"
              state={{ article }}
            >
              <i className="ion-compose" />
              &nbsp;
              Edit Post
            </Link>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleDelete}
            >
              <i className="ion-android-delete" />
              &nbsp;
              Delete Post
            </button>
          </>
        )
        : (
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
        )}
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

export default connect(undefined, { setOpen: openSigninDialog })(ArticleMeta);
