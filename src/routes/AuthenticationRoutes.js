// project imports
import MinimalLayout from 'layout/MinimalLayout';
import Error404 from 'views/pages/404/Error404';
import Login from 'views/pages/authentication/authentication/Login';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <Error404 />
    }
  ]
};

export default AuthenticationRoutes;
