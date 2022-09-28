import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

function Header(props) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">Hive</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link hhh" to="/home">Home</NavLink>
          </li>
          {props.currUser
            ? <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <img className="user-pic" src="" alt='' />
                  {props.currUser.username}
                </NavLink>
              </li>
            </Fragment>
            : <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Sign in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Sign up</NavLink>
              </li>
            </Fragment>}
        </ul>
      </div>
    </nav>
  )
}

export default connect((state) => ({currUser: state.currUser}),{})(Header)