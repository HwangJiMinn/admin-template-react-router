import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';

import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
        },
        {
          title: 'Tasks',
          url: '/tasks',
        },
        {
          title: 'Apps',
          url: '/apps',
        },
        {
          title: 'Users',
          url: '/users',
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',

          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',

          items: [
            {
              title: 'Unauthorized',
              url: '/401',
            },
            {
              title: 'Forbidden',
              url: '/403',
            },
            {
              title: 'Not Found',
              url: '/404',
            },
            {
              title: 'Internal Server Error',
              url: '/500',
            },
            {
              title: 'Maintenance Error',
              url: '/503',
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',

          items: [
            {
              title: 'Profile',
              url: '/settings',
            },
            {
              title: 'Account',
              url: '/settings/account',
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
            },
            {
              title: 'Display',
              url: '/settings/display',
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
        },
      ],
    },
  ],
};
