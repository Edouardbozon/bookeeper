import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/app.actions';
import TransactionForm from './form.component';
import TransactionList from './list.component';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.firebaseRef = firebase.database().ref('transactions/');
    }

    componentWillMount() {
        console.log(this.props);
        // this.listenTransactions(this.firebaseRef, this.props.transactions);
    }

    componentWillUnmount() {
        // this.firebaseRef.off();
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
        this.props.actions.addTransaction(value);
    }

    render(){
        return (
            <div>
                <TransactionList transactions={this.props.transactions}/>
                <TransactionForm addTransaction={this.addTransaction.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authenticated,
        user: state.user,
        transactions: state.transactions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
