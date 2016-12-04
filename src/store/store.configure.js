import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from '../reducers/root.reducer';
import * as Actions from '../actions/app.actions';

export default function configureStore (initialState)  {
    const store = createStore(
        RootReducer,
        initialState,
        compose(
            applyMiddleware(reduxThunk)
        )
    );
    
    // middleware
    store.dispatch(Actions.handleAuthStateChanged());

    return store;
}
