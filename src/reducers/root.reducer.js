import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import transactionsReducer from './transactions.reducer';
import appReducer from './app.reducer';
import { routerReducer } from 'react-router-redux';

const RootReducer = combineReducers({
    routing: routerReducer,
    authReducer,
    app: appReducer,
    transactionsReducer
});

export default RootReducer;
