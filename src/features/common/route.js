import {
  PageNotFound
} from './index';

export default {
  path: 'common',
  name: 'Common',
  childRoutes: [
    { path: 'page-not-found', name: 'Page not found', component: PageNotFound, isIndex: true },
  ],
};
