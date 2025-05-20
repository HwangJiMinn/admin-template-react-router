import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  // ✅ 기본 대시보드
  index('routes/pages/dashboard/index.tsx'),

  // ✅ General
  route('tasks', 'routes/pages/tasks/index.tsx'),
  route('apps', 'routes/pages/apps/index.tsx'),
  route('users', 'routes/pages/users/index.tsx'),

  // ✅ Pages > Auth
  route('sign-in', 'routes/pages/auth/sign-in/index.tsx'),
  route('sign-up', 'routes/pages/auth/sign-up/index.tsx'),
  route('sign-in-2', 'routes/pages/auth/sign-in/sign-in-2.tsx'),
  route('forgot-password', 'routes/pages/auth/forgot-password/index.tsx'),
  route('otp', 'routes/pages/auth/otp/index.tsx'),

  // ✅ Pages > Errors
  route('401', 'routes/pages/errors/unauthorized-error.tsx'),
  route('403', 'routes/pages/errors/forbidden.tsx'),
  route('404', 'routes/pages/errors/not-found-error.tsx'),
  route('500', 'routes/pages/errors/general-error.tsx'),
  route('503', 'routes/pages/errors/maintenance-error.tsx'),

  // ✅ Other > Settings
  route('settings', 'routes/pages/settings/index.tsx', [
    index('routes/pages/settings/profile/index.tsx'),
    route('account', 'routes/pages/settings/account/index.tsx'),
    route('appearance', 'routes/pages/settings/appearance/index.tsx'),
    route('notifications', 'routes/pages/settings/notifications/index.tsx'),
    route('display', 'routes/pages/settings/display/index.tsx'),
  ]),

  // route('dashboard', './dashboard.tsx', [
  //   // child routes
  //   index('./home.tsx'),
  //   route('settings', './settings.tsx'),
  // ]),

  // layout('./auth/layout.tsx', [
  //   route('login', './auth/login.tsx'),
  //   route('register', './auth/register.tsx'),
  // ]),

  // ✅ API 경로들
  ...prefix('api', [
    route('theme', 'routes/apis/theme.ts'),
    route('language', 'routes/apis/language.ts'),
    route('font', 'routes/apis/font.ts'),
  ]),
] satisfies RouteConfig;
