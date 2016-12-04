import firebase from 'firebase';
import firebaseConfig from '../constants/firebase.config';
import { browserHistory } from 'react-router';

export const addTransaction = (transaction) => {
    const price = parseInt(value, 0);
    if (price <= 0) return;
    const transaction = {
        date: Date.now(),
        price: price,
        author: {
            uid: this.state.user.uid,
            email: this.state.user.email
        }
    };
    // this.firebaseRef.push(transaction);
    return {
        type: 'ADD_TRANSACTION',
        payload: transaction
    }
}
