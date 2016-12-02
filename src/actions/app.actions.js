import firebase from 'firebase';
import { browserHistory } from 'react-router';
import firebaseConfig from '../constants/firebase.config';

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
    browserHistory.push('/sign-in');
    return {
        action: 'AUTH_SIGNOUT'
    }
}

export const authUser = (user) => {
    return {
        action: 'AUTH_USER',
        payload: user
    }
}

export const handleError = (error) => {
    return {
        action: 'AUTH_ERROR',
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
