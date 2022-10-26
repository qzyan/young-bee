import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { connect } from 'react-redux';
import { openSigninDialog } from '../../../redux/actions/dialog';
import defaultAvatar from '../../../assets/avatar.png';
import TagsList from '../../../components/TagsList';

function FeedItem(props) {
  const { article, currUser, setOpen, setFeedsType } = props;
  const { _id: articleId, title, description, createdAt, favorited, favoritesCount, tagList,
    author: { username, image } } = article;
  const [isFavorited, setIsFavorited] = useState(favorited);

  const favCountEl = useRef(null);

  useEffect(() => {
    setIsFavorited(favorited);
  }, [favorited]);

  async function handleToggleFavorite(e) {
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
        <Link to={`/profile/${username}`}><img alt="avatar" src={image || defaultAvatar} /></Link>
        <div className="info">
          <Link to={`/profile/${username}`} className="author">{username}</Link>
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
          &nbsp;
          <span ref={favCountEl}>{favoritesCount}</span>
        </button>
      </div>
      <Link to={`/article/${articleId}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
      <TagsList tagList={tagList} position="right" setFeedsType={setFeedsType} isOutline />
    </div>
  );
}

export default connect(undefined, { setOpen: openSigninDialog })(FeedItem);
