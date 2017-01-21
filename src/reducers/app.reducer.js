const appReducer = (state = {
    isDrawerOpen: false,
    isMobile: true
}, action) => {
    switch (action.type) {
        case '@@drawer:HANDLE_TOGGLE':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            };
        case '@@app:DETECT-MOBILE':
            return {
                ...state,
                isMobile: action.payload
            };
        default:
            return state;
    }
}

export default appReducer;
