import { lazy } from 'react';
import Main from 'pages/Main';

const Index = lazy(() => import('pages/Index'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const User = lazy(() => import('pages/User'));
const Agent = lazy(() => import('pages/Agent'));
const Url = lazy(() => import('pages/Url'));
const Stats = lazy(() => import('pages/Stats'));

const Routes = () => [
  {
    path: '/:id',
    element: <Index />,
  },
  {
    path: '/admin',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'stats',
        element: <Stats />,
        children: [
          {
            path: ':id',
            element: <Stats />,
          },
        ],
      },
      {
        path: 'agent',
        element: <Agent />,
      },
      {
        path: 'url',
        element: <Url />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

export default Routes;
