/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import Editor from '../pages/Editor';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Article from '../pages/Article';

export default [
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login isLogin={true} />,
  },
  {
    path: '/register',
    element: <Login isLogin={false} />,
  },
  {
    path: '/editor',
    element: <Editor />,
  },
  {
    path: '/profile/:username',
    element: <Profile />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/article/:articleId',
    element: <Article />,
  },
  {
    path: '/article/:articleId/update',
    element: <Editor />,
  },
  {
    path: '/*',
    element: <Navigate to="/home" replace />,
  },
];
