import {
  PageNotFound
} from './index';
import { JoinOrCreate } from './';

export default {
  path: 'common',
  name: 'Common',
  childRoutes: [
    { path: 'page-not-found', name: 'Page not found', component: PageNotFound, isIndex: true },
    { path: 'join-or-create', name: 'Join or create', component: JoinOrCreate },
  ],
};
