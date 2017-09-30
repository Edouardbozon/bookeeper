import {
  DefaultPage,
} from './';

export default {
  path: 'profile',
  name: 'Profile',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
  ],
};
