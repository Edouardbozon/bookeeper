import {
  SharedFlatList,
  CreateSharedFlatForm,
  Dashboard,
} from './';

export default {
  path: 'shared-flat',
  name: 'Shared flat',
  childRoutes: [
    { path: 'list', name: 'Shared flat list', component: SharedFlatList, isIndex: true },
    { path: 'create', name: 'Create shared flat form', component: CreateSharedFlatForm },
    { path: ':id', name: 'Dashboard', component: Dashboard },
  ],
};
