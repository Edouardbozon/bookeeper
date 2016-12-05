import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import transactionsReducer from './transactions.reducer';

const RootReducer = combineReducers({
    authReducer,
    transactionsReducer
});

export default RootReducer;
