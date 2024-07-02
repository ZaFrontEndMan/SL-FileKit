// project imports
import ThemeColors from 'Components/ThemeColors';
import CompanyLayout from 'layout/CompanyLayout';
import Documents from 'views/company/documents/Documents';
import Favourites from 'views/company/favourite/Favourites';
import Members from 'views/company/members/Members';
import Participants from 'views/company/participants/Participants';
import Permissions from 'views/company/permissions/Permissions';
import Quality from 'views/company/qualityAssurance/Quality';

// dashboard routing

// utilities routing

// sample page routing
// ==============================|| MAIN ROUTING ||============================== //

const CompanyRouts = {
  path: '/',
  element: <CompanyLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          path: 'documents',
          element: <Documents />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'favourites',
          element: <Favourites />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'members',
          element: <Members />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'participants',
          element: <Participants />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'permissions',
          element: <Permissions />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'colors',
          element: <ThemeColors />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'qa',
          element: <Quality />
        }
      ]
    }
  ]
};

export default CompanyRouts;
