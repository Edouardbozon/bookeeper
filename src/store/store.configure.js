import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from '../reducers/root.reducer';
import * as Actions from '../actions/app.actions';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Router, Route, browserHistory } from 'react-router';

export default function configureStore (initialState)  {
    const store = createStore(
        RootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(reduxThunk)
        ),
    );

    // middleware
    store.dispatch(Actions.handleAuthStateChanged());

    return store;
}
