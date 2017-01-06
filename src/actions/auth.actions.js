import firebase from 'firebase';
import firebaseConfig from '../constants/firebase.config';
import { browserHistory } from 'react-router';

firebase.initializeApp(firebaseConfig);

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
    }
}

export const signOut = () => {
    firebase.auth().signOut();
    browserHistory.push('/login');
    return {
        type: 'AUTH_SIGNOUT'
    }
}

export const authUser = (user) => {
    return {
        type: 'AUTH_USER',
        payload: user
    }
}

export const handleError = (error) => {
    return {
        type: 'AUTH_ERROR',
        payload: error
    }
}

export const handleAuthStateChanged = () => {
    return function (dispatch) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(authUser(user));
            } else {
                dispatch(signOut());
            }
        });
    }
}

export const handleEmailChange = (loginFormData) => {
    return {
        type: 'AUTH_FORM_EMAIL_CHANGE',
        payload: loginFormData
    }
}

export const handlePasswordChange = (loginFormData) => {
    return {
        type: 'AUTH_FORM_PASSWORD_CHANGE',
        payload: loginFormData
    }
}
