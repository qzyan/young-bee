import defaultAvatar from '../../../assets/avatar.png';


export default function CommentItem(props) {
  const { comment, currUser } = props;
  const { body, createdAt, favoritesCount, author: { image, username, _id: authorId } } = comment;

  if (currUser) {
    var { username: currUsername, _id: currUserId, image: currImage } = currUser
  }

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>

      <div className="card-footer">
        <a href="" className="comment-author">
          <img src={image || defaultAvatar} className="comment-author-img" />
        </a>
        &nbsp;

        <a href="" className="comment-author">{username}</a>&nbsp;
        <span className="date-posted">{new Date(createdAt).toDateString()}</span>
        {currUserId === authorId ?
          <span className="mod-options">
            <i className="ion-edit"></i>
            <i className="ion-trash-a"></i>
          </span> :
          null
        }

      </div>

    </div>
  );
}