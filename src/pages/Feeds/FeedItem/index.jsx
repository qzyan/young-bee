import {NavLink, Link} from 'react-router-dom';
import TimeAgo from 'timeago-react';
import defaultAvatar from '../../../assets/avatar.png';

export default function FeedItem(props) {
  const { _id, title, description, createdAt, favoritesCount, tagList, author: { username, image } } = props.article

  return (
    <div className="article-preview">
      <div className="article-meta">
        <NavLink href="profile/123"><img alt="avatar" src={image || defaultAvatar} /></NavLink>
        <div className="info">
          <NavLink href="profile/123" className="author">{username}</NavLink>
          <span className="date">
            <TimeAgo datetime={createdAt} />
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${_id}`} state={{article: props.article}} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
      <ul className="tag-list pull-xs-right" >
        {tagList.map((tag, index) => (
          <a href="" key={index} className="tag-default tag-pill tag-outline" >
            {tag}
          </a>
        ))}
      </ul>
    </div>
  )
}