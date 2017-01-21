import firebase from 'firebase';

const expensesFirebaseRef = firebase.database().ref('expenses/');

export const handleInputExpenseChange = (expense) => {
    return {
        type: '@@dashboard:HANDLE_INPUT_EXPENSE_CHANGE',
        payload: expense
    };
}

export const handleExpenses = (expenses) => {
    return {
        type: '@@dashboard:HANDLE_EXPENSES',
        payload: expenses
    }
}

export const handleAddExpense = () => {
    return {
        type: '@@dashboard:ADD_EXPENSE'
    }
}

export const handleRemoveExpense = () => {
    return {
        type: '@@dashboard:REMOVE_EXPENSE'
    }
}

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
        dispatch(handleAddExpense());
    }
}

export const listenExpenses = () => {
    return function (dispatch) {
        expensesFirebaseRef.on('value', (snapshot) => {
            const expenses = {};
            snapshot.forEach((data) => {
                expenses[data.key] = data.val();
            });
            dispatch(handleExpenses(expenses));
        });
    }
}

export const removeExpense = (key) => {
    return (dispatch) => {
        expensesFirebaseRef.child(key).remove();
        dispatch(handleRemoveExpense());
    }
}
