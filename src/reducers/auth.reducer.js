const initialState = {
    authenticated: false,
    user: null,
    error: null,
    loginFormData: {
        email: null,
        password: null
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                authenticated: false,
                user: action.payload,
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
                error: action.payload
            };
        case 'LOGIN:HANDLE_FORM_EMAIL_CHANGE':
            return {
                ...state,
                loginFormData: {
                    ...state.loginFormData,
                    email: action.payload
                }
            };
        case 'LOGIN:HANDLE_FORM_PASSWORD_CHANGE':
            return {
                ...state,
                loginFormData: {
                    ...state.loginFormData,
                    password: action.payload
                }
            };
        case 'SIGNUP:HANDLE_FORM_CHANGE':
            return {
                ...state,
                signupFormData: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;
