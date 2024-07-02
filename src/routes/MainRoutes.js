// project imports
import MainLayout from 'layout/MainLayout';

// dashboard routing
import DashboardDefault from 'views/dashboard/Default';

// utilities routing

import UtilsClients from 'views/manage/clients/Clients';
import UtilsPlans from 'views/manage/plans/Plans';
import Subscriptions from 'views/manage/subscriptions/Subscriptions';
// sample page routing
import ClientSubscription from 'views/pages/client/ClientSubscription';
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/',
      children: [
        {
          path: 'files',
          element: <UtilsClients />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'subscriptions/clientId/:id',
          element: <ClientSubscription />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'trash',
          element: <Subscriptions />
        }
      ]
    }
  ]
};

export default MainRoutes;
