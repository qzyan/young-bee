/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { openSigninDialog } from '../../redux/actions/dialog';
import Feeds from '../Feeds';
import Tags from '../Tags';

function HomePage(props) {
  // eslint-disable-next-line no-unused-vars
  const [feedsType, setFeedsType] = useState('global');
  const { currUser, setOpen } = props;

  const toggleFeed = (e, feedsType) => {
    e.preventDefault();

    if (feedsType === 'following' && !currUser) {
      setOpen();
      return;
    }

    setFeedsType(feedsType);
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
                  <a
                    className={`nav-link ${feedsType === 'following' ? 'active' : ''}`}
                    href="/"
                    onClick={(e) => toggleFeed(e, 'following')}
                  >
                    Following
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

export default connect((state) => ({ currUser: state.currUser }), { setOpen: openSigninDialog })(HomePage);
