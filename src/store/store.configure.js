import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from '../reducers/root.reducer';
import * as Actions from '../actions/auth.actions';

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
    store.dispatch(Actions.handleAuthStateChanged());

    return store;
}
