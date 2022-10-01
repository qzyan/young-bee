import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FeedItem from './FeedItem';
import Tags from './Tags';
import Pages from './Pages'

function Feeds(props) {
  const [isGlobal, setIsGlobal] = useState(true);
  const [articles, setArticles] = useState([]);
  const [currPage, setCurrpage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const limit = 4;

  const { currUser } = props;

  // eqal to compDidMount, get the feeds list and feeds count from api
  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles`;
    const offset = 0;
    getArticles(url, limit, offset);
  }, []);

  function changeCurrPage(e) {
    e.preventDefault();
    const currPage = parseInt(e.target.innerHTML);
    setCurrpage(currPage);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles`;
    const offset = (currPage - 1) * limit;
    getArticles(url, limit, offset);
  };

  function getArticles(url, limit, offset, tag, author) {
    if (currUser) {
      var { token } = currUser
    }

    axios.get(url,
      {
        params: { limit, offset, tag, author },
        headers: {
          'Authentication': `Bearer: ${token}`
        }
      },

    )
      .then(res => {
        const { articles, articlesCount } = res.data;
        const pagesCount = Math.ceil(articlesCount / limit);
        setArticles(articles);
        setPagesCount(pagesCount);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="home-page">

      <div className="banner">
        <div className="container">
          <h1 className="logo-font">hive</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">

          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            {articles.map(article => <FeedItem key={article._id} article={article} currUser={currUser}/>)}
            <Pages pagesCount={pagesCount} currPage={currPage} changeCurrPage={changeCurrPage} />
          </div>

          <Tags />

        </div>
      </div>

    </div>
  )
}

export default connect(state => ({ currUser: state.currUser }), {})(Feeds)