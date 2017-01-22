import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../reducers/auth.reducer';
import expenseReducer from '../reducers/expense.reducer';
import appReducer from '../reducers/app.reducer';

const RootReducer = combineReducers({
    routing: routerReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    expense: expenseReducer
});

export default RootReducer;
