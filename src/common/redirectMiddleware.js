import { path } from "ramda";
import createMiddleware from "./createMiddleware";
import history from "./history";
import {
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_SIGNUP_SUCCESS,
} from "../features/authentication/redux/constants";
import { SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS } from "../features/shared-flat/redux/constants";

export const redirectMiddleware = createMiddleware([
  {
    actions: ["@@router/LOCATION_CHANGE"],
    afterHandler: store => {
      const state = store.getState();
      const authenticated = path(["authentication", "authenticated"], state);
      if (!authenticated && history.location.pathname !== "/login") {
        history.replace("/login");
      }
    },
  },
  {
    actions: [AUTHENTICATION_LOGIN_SUCCESS, AUTHENTICATION_SIGNUP_SUCCESS],
    afterHandler: store => {
      const state = store.getState();
      const authenticated = path(["authentication", "authenticated"], state);
      const user = path(["authentication", "user"], state);

      if (
        authenticated &&
        !user.hasSharedFlat &&
        history.location.pathname !== "/shared-flat/list"
      ) {
        history.push("/common/join-or-create");
      } else if (
        authenticated &&
        user.hasSharedFlat &&
        history.location.pathname !== "/shared-flat/list"
      ) {
        history.push(`/shared-flat/${user.sharedFlatId}`);
      }
    },
  },
  {
    actions: [SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS],
    afterHandler: store => {
      const state = store.getState();
      const user = path(["authentication", "user"], state);
      // eslint-disable-next-line
      history.push(`/shared-flat/'${user.sharedFlatId}`);
    },
  },
]);
