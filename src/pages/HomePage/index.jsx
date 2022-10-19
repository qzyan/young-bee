/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Feeds from '../Feeds';
import Tags from '../Tags';

function HomePage(props) {
  // eslint-disable-next-line no-unused-vars
  const [feedsType, setFeedsType] = useState('global');
  const { currUser } = props;

  const toggleFeed = (e, feedsType) => {
    e.preventDefault();

    if (feedsType === 'personal' && !currUser) {
      alert('Please login');
      return;
    }

    setFeedsType(feedsType);
  };

  return (
    <div className="home-page">
      <h2>{feedsType}</h2>
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
                  <a
                    className={`nav-link ${currUser ? '' : 'disabled'} ${feedsType === 'personal' ? 'active' : ''}`}
                    href="/"
                    onClick={(e) => toggleFeed(e, 'personal')}
                  >
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${feedsType === 'global' ? 'active' : ''}`}
                    href="/"
                    onClick={(e) => toggleFeed(e, 'global')}
                  >
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            <Feeds feedsType={feedsType} username={currUser ? currUser.username : undefined} />
          </div>

          <Tags />

        </div>
      </div>

    </div>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(HomePage);