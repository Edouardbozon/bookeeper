import { browserHistory } from 'react-router';

export const authUser = (user) => {
    return {
        type: '@@auth:AUTH_USER',
        payload: user
    };
}

export const handleError = (error) => {
    return {
        type: '@@auth:AUTH_ERROR',
        payload: error
    };
}

export const handleLogout = () => {
    return {
        type: '@@auth:AUTH_LOGOUT'
    };
}

export const handleLoginEmailChange = (loginFormData) => {
    return {
        type: '@@login:HANDLE_FORM_EMAIL_CHANGE',
        payload: loginFormData
    };
}

export const handleLoginPasswordChange = (loginFormData) => {
    return {
        type: '@@login:HANDLE_FORM_PASSWORD_CHANGE',
        payload: loginFormData
    };
}

export const handleSignupSuccess = (credentials) => {
    return {
        type: '@@signup:HANDLE_FIREBASE_SIGNUP_SUCCESS',
        payload: credentials
    };
}

export const handleSignupFail = (error) => {
    return {
        type: '@@signup:HANDLE_FIREBASE_SIGNUP_FAIL',
        payload: error
    };
}

export const redirectToPage = () => {
    return {
        type: '@@login:INTELLIGENT_REDIRECTION'
    };
}

export const signIn = (credentials) => {
    return function(dispatch) {
        fetch(
            'http://localhost:3000/login', 
            { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: credentials.email, 
                    password: credentials.password,
                })
            }
        )
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            dispatch(handleError(response));
        }, (err) => {
            console.log(err);
            dispatch(handleError(err));
        })
        .then((user) => {
            console.log(user)
            dispatch(authUser(user));
            browserHistory.push('/dashboard');
        });
    };
}

export const logout = () => {
    return function (dispatch) {
        fetch(
            'http://localhost:3000/logout',
            { method: 'POST' }
        )
        .then(() => {
            dispatch(handleLogout());
            browserHistory.push('/login');
        })
        .catch((error) => {
            dispatch(handleError(error));
        });

    }
}

// export const handleAuthStateChanged = () => {
//     return function (dispatch) {
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 dispatch(authUser(user));
//             } else {
//                 dispatch(logout());
//             }
//         });
//     };
// }

export const signup = (credentials) => {
    return function (dispatch) {
        fetch(
            'http://localhost:3000/signup',
            {
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password
                }
            }
        )
        .then((response) => {
            dispatch(handleSignupSuccess(response));
            dispatch(redirectToPage());
        })
        .catch((error) => {
            dispatch(handleSignupFail(error));
        });
    }
}
