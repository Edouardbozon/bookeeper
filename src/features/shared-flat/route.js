import {
  SharedFlatList,
  CreateSharedFlatForm,
} from './';

export default {
  path: 'shared-flat',
  name: 'Shared flat',
  childRoutes: [
    { path: 'list', name: 'Shared flat list', component: SharedFlatList, isIndex: true },
    { path: 'create', name: 'Create shared flat form', component: CreateSharedFlatForm },
  ],
};
