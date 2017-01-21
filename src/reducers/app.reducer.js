const appReducer = (state = {
    isDrawerOpen: false
}, action) => {
    switch (action.type) {
        case '@@drawer:HANDLE_TOGGLE':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            };
        default:
            return state;
    }
}

export default appReducer;
