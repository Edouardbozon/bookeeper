import React, { Component } from 'react';
import Navbar from './navbar.component';
import firebase from 'firebase';
// import firebaseui from 'firebaseui';
// import firebaseUiConfig from '../constants/firebase-ui.config';

class Bookkeeper extends Component {

    constructor (props) {
        super(props);
        // initial state
        this.state = {
            user: undefined,
            authentified: false
        };
    }

    componentWillMount() {
        // const authentificationForm = new firebaseui.auth.AuthUI(firebase.auth());
        // authentificationForm.start('#firebase-auth-wrapper', firebaseUiConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
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

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return (
            <div>
                <Navbar navlinks={'hey'}></Navbar>
                { this.props.children }
            </div>
        );
    }
}

export default Bookkeeper;
