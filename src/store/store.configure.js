import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from './root.reducer';
import * as AuthActions from '../actions/auth.actions';
import * as AppActions from '../actions/app.actions';

export default function configureStore (initialState)  {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        RootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(reduxThunk)
        )
    );

    // middleware
    // store.dispatch(AuthActions.handleAuthStateChanged());
    store.dispatch(AppActions.detectMobile());

    return store;
}
