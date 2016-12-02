import firebase from 'firebase';

const firebaseUiConfig = {
    'signInFlow': 'popup',
    'signInOptions': [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: 'http://localhost:3000/tos'
};

export default firebaseUiConfig;
