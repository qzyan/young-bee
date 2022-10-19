/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/avatar.png';
import Feeds from '../Feeds';
// import Tags from '../Tags';

function Profile() {
  const [profile, setProfile] = useState({});
  const { username } = useParams();

  // const [isMyArticles, setIsMyArticles] = useState(true);

  const { bio, image } = profile;

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
                  <a className="nav-link active" href="/">My Articles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Favorited Articles</a>
                </li>
              </ul>
            </div>

            <Feeds feedsType="profile" username={username} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default connect((state) => ({ currUser: state.currUser }), {})(Profile);
