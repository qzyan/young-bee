import { Navigate } from 'react-router-dom';
import Login from '../containers/Login';
import Feeds from '../pages/Feeds';
import Editor from '../containers/Editor';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';


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
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/*',
    element: <Navigate to="/home" replace />
  }

]
