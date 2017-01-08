import firebase from 'firebase';

const expensesFirebaseRef = firebase.database().ref('expenses/');

export const addExpense = (value) => {
    return (dispatch) => {
        const amount = parseInt(value, 0);
        if (amount <= 0) return;
        const currentUser = firebase.auth().currentUser;
        const expense = {
            date: Date.now(),
            amount: amount,
            user: {
                email: currentUser.email,
                uid: currentUser.uid
            },
            group: null
        };
        expensesFirebaseRef.push(expense);
    }
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

export const deleteExpense = (key) => {
    return (dispatch) => {
        expensesFirebaseRef.child(key).remove();
    }
}
