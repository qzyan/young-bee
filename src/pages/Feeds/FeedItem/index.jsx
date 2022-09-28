export default function FeedItem(props) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile/123"><img alt="" src="http://i.imgur.com/Qr71crq.jpg" /></a>
        <div className="info">
          <a href="profile/123" className="author">Eric Simons</a>
          <span className="date">January 20th</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> 29
        </button>
      </div>
      <a href="article/123" className="preview-link">
        <h1>How to build webapps that scale</h1>
        <p>This is the description for the post.</p>
        <span>Read more...</span>
      </a>
    </div>
  )
}