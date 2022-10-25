/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createLoginAction } from '../../redux/actions/currUser';

function Settings(props) {
  const { currUser, login } = props;
  const { bio, image, username, email } = currUser || {};
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleLogout() {
  }

  function handleSubmit(e) {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // eslint-disable-next-line no-unreachable
    axios.put(`${BASE_URL}/user`, { user }, {
      headers: {
        Authentication: `Bearer: ${currUser.token}`,
      },
    })
      .then((res) => {
        const { user: updatedUser } = res.data;
        login(updatedUser);
        // jump to the home
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function collectData(e, dataType) {
    const { value } = e.target;
    setUser({ ...user, [dataType]: value });
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Profile Settings</h1>

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    defaultValue={image}
                    onChange={(e) => collectData(e, 'image')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    defaultValue={username}
                    onChange={(e) => collectData(e, 'username')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    defaultValue={bio}
                    onChange={(e) => collectData(e, 'bio')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    defaultValue={email}
                    onChange={(e) => collectData(e, 'email')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control
                     form-control-lg"
                    type="password"
                    placeholder="Previous Password"
                    onChange={(e) => collectData(e, 'prevPassword')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control
                     form-control-lg"
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => collectData(e, 'password')}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <a href="/logout">
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
                type="button"
              >
                Or click here to logout.
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ currUser: state.currUser }),
  { login: createLoginAction },
)(Settings);
