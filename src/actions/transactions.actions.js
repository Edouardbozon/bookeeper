import firebase from 'firebase';
import firebaseConfig from '../constants/firebase.config';
import { browserHistory } from 'react-router';

const expensesFirebaseRef = firebase.database().ref('transactions/');

export const addExpense = (value) => {
    const amount = parseInt(value, 0);
    if (amount <= 0) return;
    const currentUser = firebase.auth().currentUser;
    const expense = {
        date: Date.now(),
        amount: amount,
        user: {
            uid: currentUser.uid,
            email: currentUser.email
        },
        group: null
    };
    expensesFirebaseRef.push(expense);
    return {
        type: 'ADD_EXPENSE',
        payload: expense
    };
}

export const handleExpenses = (expenses) => {
    return {
        type: 'HANDLE_EXPENSES',
        payload: expenses
    }
}

export const listenExpenses = () => {
    return function (dispatch) {
        expensesFirebaseRef.on('value', (snapshot) => {
            const expenses = {};
            snapshot.forEach((data) => {
                // console.log(data.val());
                expenses[data.key] = data.val();
                // expenses.push({ ...data.val(), _key: data.key });
            });
            dispatch(handleExpenses(expenses));
        });
    }
}

export const modfiyExpense = (expense) => {
    // return fonction (dispatch) {
    //     expensesFirebaseRef.update(expense._key)
    //         .
    // }
}
