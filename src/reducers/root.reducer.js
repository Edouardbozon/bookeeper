import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import transactionsReducer from './transactions.reducer';
import { routerReducer } from 'react-router-redux';

const RootReducer = combineReducers({
    routing: routerReducer,
    authReducer,
    transactionsReducer
});

export default RootReducer;
