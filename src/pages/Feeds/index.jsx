/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FeedItem from '../FeedItem';
import Pages from '../Pages';
import { getArticles } from '../../utils/http';
import LoginDialogSlide from '../../components/LoginDialogSlide';

function Feeds(props) {
  const [articles, setArticles] = useState([]);
  const [currPage, setCurrpage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [open, setOpen] = React.useState(false);

  const { currUser, feedsType, username } = props;
  // when current page changes, get the feeds list and feeds count from api
  useEffect(() => {
    async function fetchArticlesData(url, limit, offset, token, tag, author, favoritedBy) {
      const res = await getArticles(url, limit, offset, token, tag, author, favoritedBy);
      const { articles, articlesCount } = res.data;
      const pagesCount = Math.ceil(articlesCount / limit);
      setArticles(articles);
      setPagesCount(pagesCount);
    }
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const limit = 3;
    const offset = (currPage - 1) * limit;
    const { token } = currUser || {};
    if (feedsType === 'global') {
      const url = `${BASE_URL}/articles`;
      fetchArticlesData(url, limit, offset, token);
    }

    if (feedsType === 'personal') {
      const url = `${BASE_URL}/articles/feed`;
      fetchArticlesData(url, limit, offset, token);
    }

    if (feedsType === 'profile') {
      const url = `${BASE_URL}/articles`;
      fetchArticlesData(url, limit, offset, token, undefined, username);
    }

    if (feedsType === 'favorites') {
      const url = `${BASE_URL}/articles`;
      fetchArticlesData(url, limit, offset, token, undefined, undefined, username);
    }
  }, [currPage, pagesCount, feedsType, currUser]);

  useEffect(() => {
    setCurrpage(1);
  }, [feedsType]);

  const changeCurrPage = (e) => {
    e.preventDefault();
    const currPage = parseInt(e.target.innerHTML, 10);
    setCurrpage(currPage);
  };

  return (
    <>
      <LoginDialogSlide open={open} setOpen={setOpen} />
      {articles.map((article) => <FeedItem key={article._id} article={article} currUser={currUser} setOpen={setOpen} />)}
      <Pages pagesCount={pagesCount} currPage={currPage} changeCurrPage={changeCurrPage} />
    </>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(Feeds);
