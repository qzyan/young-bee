import { connect } from 'react-redux';
import { createLoginAction } from '../../redux/actions/currUser';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

//define UI component
function Login(props) {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLogin(props.isLogin);
  }, [props.isLogin]);


  function toggleIsLogin(event) {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  function collectData(e, dataType) {
    const { value } = e.target;
    setUser({ ...user, [dataType]: value });
  }

  // send ajax request to login
  function handleSubmit(e) {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = isLogin ? `${BASE_URL}/users/login` : `${BASE_URL}/users`
    axios.post(url, { user })
      .then(res => {
        const { user } = res.data;
        // update the currUser in redux
        props.login(user);
        // jump to home
        navigate('/home')

      })
      .then(() => {
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isLogin ? 'Sign in' : 'Sign up'}</h1>
            <p className="text-xs-center">
              {isLogin
                ? <a href=":javascript" onClick={toggleIsLogin}>Need a new account?</a>
                : <a href=":javascript" onClick={toggleIsLogin}>Have an account?</a>}

            </p>
            <form onSubmit={handleSubmit}>
              {isLogin
                ? null
                : <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                    name="username" required
                    onChange={(e) => collectData(e, 'username')} />
                </fieldset>}

              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="email" placeholder="Email"
                  name="email" required
                  onChange={(e) => collectData(e, 'email')} />
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password"
                  name="password" required
                  onChange={(e) => collectData(e, 'password')} />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}


// return an object, key as the props.key that pass to UI, value as props.key's value that pass to UI----redux's state
function mapStateToProps(state, ownProps) {
  return {
    currUser: state.currUser,
    ownProps
  };
}

// return an object, key as the props.key that pass to UI, value as props.key's value that pass to UI----redux's method
// function mapDispatchToProps (dispatch) {
//   return {
//     login: (data) => {
//       //let redux update currUser
//       dispatch(createLoginAction(data))
//     }
//   };
// }

// can be simplified to an object
const mapDispatchToProps = { login: createLoginAction }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
