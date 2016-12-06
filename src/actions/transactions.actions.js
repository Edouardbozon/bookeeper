import firebase from 'firebase';
import firebaseConfig from '../constants/firebase.config';
import { browserHistory } from 'react-router';

const expensesFirebaseRef = firebase.database().ref('transactions/');

// export const addTransaction = (transaction) => {
//     const price = parseInt(value, 0);
//     if (price <= 0) return;
//     const transaction = {
//         date: Date.now(),
//         price: price,
//         author: {
//             uid: this.state.user.uid,
//             email: this.state.user.email
//         }
//     };
//     // this.firebaseRef.push(transaction);
//     return {
//         type: 'ADD_TRANSACTION',
//         payload: transaction
//     }
// }

export const handleExpenses = (expenses) => {
    return {
        type: 'HANDLE_EXPENSES',
        payload: expenses
    }
}

export const listenExpenses = () => {
    return function (dispatch) {
        expensesFirebaseRef.on('value', (snapshot) => {
            const expenses = [];
            snapshot.forEach((data) => {
                expenses.push({ ...data.val(), _key: data.key });
            });
            dispatch(handleExpenses(expenses));
        });
    }
}
