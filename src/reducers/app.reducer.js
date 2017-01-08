const appReducer = (state = {
    isDrawerOpen: false
}, action) => {
    switch (action.type) {
        case 'DRAWER:HANDLE_TOGGLE':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            };
        default:
            return state;
    }
}

export default appReducer;
