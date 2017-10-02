
import { path } from 'ramda';
import createMiddleware from './createMiddleware';
import history from './history';
import {
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_SIGNUP_SUCCESS
} from '../features/authentication/redux/constants';

export const redirectMiddleware = createMiddleware([
  {
    actions: ['@@router/LOCATION_CHANGE'],
    beforeHandler: (store) => {
      const state = store.getState();
      if (!state.authentication.user && history.location.pathname !== '/login') {
        history.replace('/login');
      }
    }
  },
  {
    actions: [AUTHENTICATION_LOGIN_SUCCESS, AUTHENTICATION_SIGNUP_SUCCESS],
    afterHandler: (store) => {
      const state = store.getState();
      const user = path(false, ['authentication', 'user'], state);
      if (user && !user.hasSharedFlat && history.location.pathname !== '/shared-flat/list') {
        history.replace('/common/join-or-create');
      } else if (user && user.hasSharedFlat && history.location.pathname !== '/shared-flat/list') {
        history.replace('/shared-flat/{id}');
      }
    }
  },
]);
