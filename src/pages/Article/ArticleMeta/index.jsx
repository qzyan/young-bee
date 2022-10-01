import { connect } from 'react-redux';
import {useState} from 'react';
import defaultAvatar from '../../../assets/avatar.png';



export default function ArticleMeta(props) {
  const { username, createdAt, favoritesCount, image, handleToggleFavorite, isFavorited } = props;

  return (
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
      <button className={`btn btn-sm btn-outline-primary ${(isFavorited ? 'active' : '')}`}
      onClick={handleToggleFavorite}>
        <i className="ion-heart"></i>
        &nbsp;
        Favorite Post <span className="counter" >{favoritesCount}</span>
      </button>
    </div>
  )
}

