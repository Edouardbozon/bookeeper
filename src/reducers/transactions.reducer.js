const transactionsReducer = (state = {
    expenses: []
}, action) => {
    switch (action.type) {
        case 'HANDLE_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            };
        default:
            return state;
    }
}

export default transactionsReducer;
