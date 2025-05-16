import { index, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/pages/home/index.tsx'),
  route('users', 'routes/pages/user/users.tsx'),

  route('login', 'routes/pages/login/login.tsx'),

  // ✅ API 경로들
  ...prefix('api', [
    route('theme', 'routes/apis/theme.ts'),
    route('language', 'routes/apis/language.ts'),
  ]),
] satisfies RouteConfig;
