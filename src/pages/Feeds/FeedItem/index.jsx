import TimeAgo from 'timeago-react';
import defaultAvatar from '../../../assets/avatar.png';

export default function FeedItem(props) {
  const { title, description, createdAt, favoritesCount, author: { username, image } } = props.article
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile/123"><img alt="avatar" src={image || defaultAvatar} /></a>
        <div className="info">
          <a href="profile/123" className="author">{username}</a>
          <span className="date">
            <TimeAgo datetime={createdAt} />
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <a href="article/123" className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  )
}