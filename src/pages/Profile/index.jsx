/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/avatar.png';
import Feeds from '../../containers/Feeds';
// import Tags from '../Tags';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { bio, image } = profile;
  const [feedsType, setFeedsType] = useState('profile');
  const { username } = useParams();

  const toggleFeed = (e, feedsType) => {
    e.preventDefault();

    setFeedsType(feedsType);
  };

  // get the user's bio and related articles when component is mounted
  useEffect(() => {
    async function fetchProfile() {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/profiles/${username}`;
        const { data: { profile } } = await axios.get(url);
        setProfile(profile);
      } catch (e) {
        console.log(e);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image || defaultAvatar} alt="" className="user-img" />
              <h4>{username}</h4>
              <p>
                {bio}
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn" type="button">
                <i className="ion-plus-round" />
                &nbsp;
                {`Follow ${username}`}
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className={`nav-link ${feedsType === 'profile' ? 'active' : ''}`} href="/" onClick={(e) => toggleFeed(e, 'profile')}>My Articles</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${feedsType === 'favorites' ? 'active' : ''}`} href="/" onClick={(e) => toggleFeed(e, 'favorites')}>Favorited Articles</a>
                </li>
              </ul>
            </div>

            <Feeds feedsType={feedsType} username={username} />
          </div>

        </div>
      </div>

    </div>
  );
}
