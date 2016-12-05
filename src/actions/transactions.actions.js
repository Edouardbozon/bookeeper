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
            console.log(snapshot.val());
            const expenses = [];
            snapshot.forEach((data) => {
                console.log(data.val());
                expenses.push({
                    date: data.val().date,
                    price: data.val().price,
                    author: data.val().author,
                    _key: data.key
                });
            });
            dispatch(handleExpenses(expenses));
        });
    }
}
