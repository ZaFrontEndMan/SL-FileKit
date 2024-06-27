// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconTrash,
  IconCalendarStar,
  IconFileDescription
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCalendarStar,
  IconFileDescription,
  IconTrash
};

// ==============================|| reports MENU ITEMS ||============================== //

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'util-activity-log',
      title: 'Activity log',
      type: 'item',
      url: '/activity-log',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    },
    {
      id: 'util-engagement-matrix',
      title: 'Engagement matrix',
      type: 'item',
      url: '/engagement-matrix',
      icon: icons.IconCalendarStar,
      breadcrumbs: false
    },
    {
      id: 'util-data-storage',
      title: 'Data storage',
      type: 'item',
      url: '/data-storage',
      icon: icons.IconTrash,
      breadcrumbs: false
    },
    {
      id: 'util-quality',
      title: 'QA',
      type: 'item',
      url: '/qa',
      icon: icons.IconTrash,
      breadcrumbs: false
    },
    {
      id: 'util-subscriptions',
      title: 'Subscriptions',
      type: 'item',
      url: '/subscriptions',
      icon: icons.IconTrash,
      breadcrumbs: false
    }
  ]
};

export default reports;
