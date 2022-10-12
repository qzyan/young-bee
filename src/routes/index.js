import { Navigate } from 'react-router-dom';
import Login from '../containers/Login';
import Feeds from '../pages/Feeds';
import Editor from '../containers/Editor';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Article from '../pages/Article';


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/home',
    element: <Feeds />
  },
  {
    path: '/login',
    element: <Login isLogin={true} />
  },
  {
    path: '/register',
    element: <Login isLogin={false} />
  },
  {
    path: '/editor',
    element: <Editor />
  },
  {
    path: '/profile/:username',
    element: <Profile />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/article/:articleId',
    element: <Article />
  },
  {
    path: '/*',
    element: <Navigate to="/home" replace />
  }

]
