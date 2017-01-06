const transactionsReducer = (state = {
    expenses: []
}, action) => {
    switch (action.type) {
        case 'HANDLE_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            };
        case 'ADD_EXPENSE':
            return state;
        default:
            return state;
    }
}

export default transactionsReducer;
