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
        case '@@auth:AUTH_USER':
            return {
                ...state,
                authenticated: false,
                user: action.payload,
                error: null
            };
        case '@@auth:AUTH_LOGOUT':
            return {
                ...state,
                authenticated: false,
                user: null,
                error: null
            };
        case '@@auth:AUTH_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case '@@login:HANDLE_FORM_EMAIL_CHANGE':
            return {
                ...state,
                loginFormData: {
                    ...state.loginFormData,
                    email: action.payload
                }
            };
        case '@@login:HANDLE_FORM_PASSWORD_CHANGE':
            return {
                ...state,
                loginFormData: {
                    ...state.loginFormData,
                    password: action.payload
                }
            };
        case '@@signup:HANDLE_FORM_CHANGE': // @TODO bind with redux form
            return {
                ...state,
                signupFormData: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;
