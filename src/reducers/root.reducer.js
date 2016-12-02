const initialState = {
    authenticated: false,
    error: null
};

const RootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                error: null
            };
        case 'AUTH_SIGNOUT':
            return {
                ...state,
                authenticated: false,
                user: null,
                error: null
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                error: action.payload.message
            };
        default:
            return state;

    }
}

export default RootReducer;
