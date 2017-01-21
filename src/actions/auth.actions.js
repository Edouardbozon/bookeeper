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

export const handleLogout = (error) => {
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

export const signup = (signupFormData) => {
    return {
        type: '@@signup:SIGN_UP_FORM_SUBMIT',
        payload: signupFormData
    };
}

export const logout = () => {
    return (dispatch) => {
        firebase.auth().signOut();
        browserHistory.push('/login');
        dispatch(handleLogout());
    }
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
