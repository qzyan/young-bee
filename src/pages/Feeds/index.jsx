import FeedItem from './FeedItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Feeds(props) {
  const [isGlobal, setIsGlobal] = useState(true);
  const [currPage, setCurrpage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  // eqal to compDidMount, get the feeds list and feeds count from api
  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles`;
    const limit = 2;
    const offset = 0;
    axios.get(url, {params: {limit, offset}})
      .then(res => {
        const { articles, articlesCount } = res.data;
        const pagesCount = Math.ceil(articlesCount/limit)
        setArticles(articles)
        setPagesCount(pagesCount)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function changeCurrPage(e) {
    e.preventDefault();
    const currPage = parseInt(e.target.innerHTML)
    setCurrpage(currPage)
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/articles`;
    const limit = 2;
    const offset = currPage - 1;
    axios.get(url, {params: {limit, offset}})
      .then(res => {
        const { articles, articlesCount } = res.data;
        const pagesCount = Math.ceil(articlesCount/limit)
        setArticles(articles)
        setPagesCount(pagesCount)
      })
      .catch(err => {
        console.log(err)
      })
  }

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

            {articles.map(article => <FeedItem key={article._id} article={article} />)}

            <nav>
              <ul className="pagination">
                {new Array(pagesCount).fill().map((ele, i) => (
                  <li className={`page-item ${currPage === i + 1 ? 'active' : ''}`} key={i}>
                  <a onClick={changeCurrPage} className="page-link"href="">{i + 1}</a>
                </li>
                ))}
              </ul>
            </nav>

          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}