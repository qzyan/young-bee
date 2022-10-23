/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import defaultAvatar from '../../../assets/avatar.png';

export default function CommentItem(props) {
  const { comment, currUser } = props;
  const {
    _id: commentId,
    body,
    article_id: articleId,
    createdAt,
    favoritesCount,
    author: { image, username, _id: authorId },
  } = comment;

  const { username: currUsername, _id: currUserId, image: currImage } = currUser || {};

  const [isHidden, setIsHidden] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles/${articleId}/comments/${commentId}`;
    try {
      const result = await axios.delete(url, {
        headers: {
          Authentication: `Bearer: ${currUser.token}`,
        },
      });

      setIsHidden(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card" style={{ display: isHidden ? 'none' : 'block' }}>
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>

      <div className="card-footer">
        <a href="/" className="comment-author">
          <img src={image || defaultAvatar} alt="" className="comment-author-img" />
        </a>
        &nbsp;

        <a href="/" className="comment-author">{username}</a>
        &nbsp;
        <span className="date-posted">{new Date(createdAt).toDateString()}</span>
        {currUserId === authorId
          ? (
            <span className="mod-options">
              <i className="ion-edit" />
              <i className="ion-trash-a" onClick={handleDelete} aria-hidden="true" />
            </span>
          )
          : null}

      </div>

    </div>
  );
}
