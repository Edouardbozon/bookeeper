import {
  PageNotFound,
  JoinOrCreate,
} from './index';

export default {
  path: 'common',
  name: 'Common',
  childRoutes: [
    { path: 'join-or-create', name: 'Join or create', component: JoinOrCreate, isIndex: true },
    { path: 'page-not-found', name: 'Page not found', component: PageNotFound },
  ],
};
