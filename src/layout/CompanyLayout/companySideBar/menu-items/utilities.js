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

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Manage',
  type: 'group',
  children: [
    {
      id: 'util-docs',
      title: 'Documents',
      type: 'item',
      url: '/documents',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    },
    {
      id: 'util-participants',
      title: 'Participants',
      type: 'item',
      url: '/participants',
      icon: icons.IconCalendarStar,
      breadcrumbs: false
    },
    {
      id: 'util-permissions',
      title: 'Permissions',
      type: 'item',
      url: '/permissions',
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
    }
  ]
};

export default utilities;
