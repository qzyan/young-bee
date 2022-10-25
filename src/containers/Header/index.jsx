/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultAvatar from '../../assets/avatar.png';
import { createLogoutAction } from '../../redux/actions/currUser';

function Header(props) {
  const { currUser, signOut } = props;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/home">Hive</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link hhh" to="/home">Home</NavLink>
          </li>
          {currUser
            ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/editor">
                    <i className="ion-compose" />
                    &nbsp;New Article
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profile/${currUser.username}`}>
                    <img className="user-pic" src={currUser.image || defaultAvatar} alt="avatar" />
                    {currUser.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home" onClick={handleSignOut}>
                    <i className="ion-log-out" />
                    &nbsp;Sign out
                  </Link>
                </li>
              </>
            )
            : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Sign in</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Sign up</NavLink>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default connect(
  (state) => ({ currUser: state.currUser }),
  { signOut: createLogoutAction },
)(Header);
