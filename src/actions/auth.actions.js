import firebase from 'firebase';
import firebaseConfig from '../constants/firebase.config';
import { browserHistory } from 'react-router';

firebase.initializeApp(firebaseConfig);

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

export const signIn = (credentials) => {
    return function (dispatch) {
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((user) => {
                dispatch(authUser(user));
                browserHistory.push('/dashboard');
            })
            .catch((error) => {
                dispatch(handleError(error));
            })
        ;
    };
}

export const logout = () => {
    return function (dispatch) {
        firebase.auth()
            .signOut()
            .then(() => {
                dispatch(handleLogout());
                browserHistory.push('/login');
            })
            .catch((error) => {
                dispatch(handleError(error));
            })
        ;

    }
}

export const handleAuthStateChanged = () => {
    return function (dispatch) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(authUser(user));
            } else {
                dispatch(logout());
            }
        });
    };
}

export const signup = (credentials) => {
    return function (dispatch) {
        firebase.auth()
            .createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then((response) => {
                console.log(response);
                dispatch(handleSignupSuccess(response));
                browserHistory.push('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                dispatch(handleSignupFail(error));
            })
        ;

    }
}
