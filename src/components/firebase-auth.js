import firebase from 'firebase';

export const signIn = (credentials) => {
    return function () {
        firebase.auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .catch((error) => {
                this.handleError(error);
            });
        }
}

export const handleError = (error) => {
    return function () {

        }
}

export const handleAuthStateChanged = () => {
    return function () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoUrl: user.photoUrl,
                        uid: user.uid,
                        providerData: user.providerData
                    },
                    authentified: true
                });
            } else {
                this.setState({ user: undefined, authentified: false });
            }
        });
}

export const signOutUser = () => {
  browserHistory.push('/');
}
