import {
  Login,
} from './';

export default {
  path: 'login',
  name: 'Login',
  childRoutes: [
    { path: 'login', name: 'Login page', component: Login, isIndex: true },
  ],
};
