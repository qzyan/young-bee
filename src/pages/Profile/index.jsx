/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import defaultAvatar from '../../assets/avatar.png';
import Feeds from '../../containers/Feeds';
import { openSigninDialog } from '../../redux/actions/dialog';
// import Tags from '../Tags';

function Profile(props) {
  const { currUser, setOpen } = props;
  const [profile, setProfile] = useState({});
  const { bio, image } = profile;
  const [feedsType, setFeedsType] = useState('profile');
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = useParams();

  // get the user's bio and related articles when component is mounted
  useEffect(() => {
    async function fetchProfile() {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/profiles/${username}`;
        const { token } = currUser || {};
        const params = token ? {
          headers: {
            Authentication: `Bearer: ${token}`,
          },
        }
          : {};
        const { data: { profile } } = await axios.get(url, params);
        setProfile(profile);
        setIsFollowing(profile.following);
      } catch (e) {
        console.log(e);
      }
    }

    fetchProfile();
  }, []);

  const handleChangeFeedsType = (e, feedsType) => {
    e.preventDefault();

    setFeedsType(feedsType);
  };

  const handleToggleFollowing = () => {
    // auth required
    if (!currUser) {
      setOpen(true);
      return;
    }

    // send ajax follow request
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/profiles/${username}/follow`;
    // currently following the author, send ajax request to unfollow
    if (isFollowing) {
      axios.delete(url, {
        headers: {
          // eslint-disable-next-line react/prop-types
          Authentication: `Bearer: ${currUser.token}`,
        },
      })
        .then(() => {
          setIsFollowing(!isFollowing);
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }

    axios.post(url, {}, {
      headers: {
        // eslint-disable-next-line react/prop-types
        Authentication: `Bearer: ${currUser.token}`,
      },
    })
      .then(() => {
        setIsFollowing(!isFollowing);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
              {currUser && currUser.username === username
                ? null
                : (
                  <button
                    className={`btn btn-sm btn-outline-secondary action-btn ${(isFollowing ? 'active' : '')}`}
                    type="button"
                    onClick={handleToggleFollowing}
                  >
                    <i className="ion-plus-round" />
                    &nbsp;
                    {isFollowing ? `Unfollow ${username}` : `Follow ${username}`}
                  </button>
                )}

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
                  <a className={`nav-link ${feedsType === 'profile' ? 'active' : ''}`} href="/" onClick={(e) => handleChangeFeedsType(e, 'profile')}>My Articles</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${feedsType === 'favorites' ? 'active' : ''}`} href="/" onClick={(e) => handleChangeFeedsType(e, 'favorites')}>Favorited Articles</a>
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

export default connect((state) => ({ currUser: state.currUser }), { setOpen: openSigninDialog })(Profile);
