/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { connect } from 'react-redux';
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { createLoginAction } from '../../redux/actions/currUser';

// define UI component
function Login(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { isLogin, isModal, setIsLogin, handleClose } = props;

  function collectData(e, dataType) {
    const { value } = e.target;
    setUser({ ...user, [dataType]: value });
  }

  // send ajax request to login
  function handleSubmit(e) {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = isLogin ? `${BASE_URL}/users/login` : `${BASE_URL}/users`;
    axios.post(url, { user })
      .then((res) => {
        const { user } = res.data;
        // update the currUser in redux
        props.login(user);
        // jump to home
        if (!isModal) {
          navigate(-1);
        }
        handleClose();
      })
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggleIsLogin(e) {
    e.preventDefault();
    setIsLogin(!isLogin);
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className={isModal ? 'col-12' : 'col-md-6 offset-md-3 col-xs-12'}>
            <h1 className="text-xs-center">{isLogin ? 'Sign in' : 'Sign up'}</h1>
            <p className="text-xs-center">
              {
                isModal
                  ? <a href="/" onClick={handleToggleIsLogin}>{isLogin ? 'Need a new account?' : 'Have an account?'}</a>
                  : <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Need a new account?' : 'Have an account?'}</Link>
              }

            </p>
            <form onSubmit={handleSubmit}>
              {isLogin
                ? null
                : (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="username"
                      required
                      onChange={(e) => collectData(e, 'username')}
                    />
                  </fieldset>
                )}

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={(e) => collectData(e, 'email')}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={(e) => collectData(e, 'password')}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

// return an object, key as the props.key that pass to UI,
// value as props.key's value that pass to UI----redux's state
function mapStateToProps(state) {
  return {
    currUser: state.currUser,
  };
}

// return an object, key as the props.key that pass to UI,
// value as props.key's value that pass to UI----redux's method
// function mapDispatchToProps (dispatch) {
//   return {
//     login: (data) => {
//       //let redux update currUser
//       dispatch(createLoginAction(data))
//     }
//   };
// }

// can be simplified to an object
const mapDispatchToProps = { login: createLoginAction };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
