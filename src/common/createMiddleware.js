
import { filter, head, any } from 'ramda';

export default function createMiddleware(handlers) {
  return store => next => (action) => {
    // find handler that match actions
    const actionHandler = head(filter(handler => any(
      handlerAction => handlerAction === action.type)(handler.actions), handlers
    ));
    // before the action is dispatched
    if (actionHandler && actionHandler.beforeHandler) {
      actionHandler.beforeHandler(store, action);
    }
    // dispatch the action
    const result = next(action);
    // after the action is dispatched
    if (actionHandler && actionHandler.afterHandler) {
      actionHandler.afterHandler(store, action);
    }
    return result;
  };
}
