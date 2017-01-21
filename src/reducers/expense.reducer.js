const expenseReducer = (state = {
    expenses: [],
    expenseInput: ''
}, action) => {
    switch (action.type) {
        case '@@dashboard:HANDLE_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            };
        case '@@dashboard:ADD_EXPENSE':
            return {
                ...state,
                expenseInputValue: ''
            };
        case '@@dashboard:HANDLE_INPUT_EXPENSE_CHANGE':
            return {
                ...state,
                expenseInputValue: action.payload
            };
        default:
            return state;
    }
}

export default expenseReducer;
