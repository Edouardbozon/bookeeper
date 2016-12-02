import React, { Component } from 'react';
import firebase from 'firebase';
import TransactionForm from './form.component';
import TransactionList from './list.component';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.firebaseRef = firebase.database().ref('transactions/');
    }

    componentWillMount() {
        this.listenTransactions(this.firebaseRef, this.state.transactions);
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    listenTransactions(firebaseRef, state) {
        firebaseRef.on('value', (snapshot) => {
            const transactions = [];
            snapshot.forEach((data) => {
                transactions.push({
                    date: data.val().date,
                    price: data.val().price,
                    author: data.val().author,
                    _key: data.key
                });
            });
            const updatedState = state.concat(transactions);
            this.setState({ transactions: updatedState });
            console.log();
        });
    }

    addTransaction (value) {
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
        this.firebaseRef.push(transaction);
    }

    render(){
        return (
            <div>
                <TransactionList transactions={this.state.transactions}/>
                <TransactionForm addTransaction={this.addTransaction.bind(this)}/>
            </div>
        );
    }
}
