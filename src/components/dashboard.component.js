import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/transactions.actions';
import TransactionForm from './form.component';
import TransactionList from './list.component';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.firebaseRef = firebase.database().ref('transactions/');
    }

    componentWillMount() {
        console.log(this.props);
        this.props.actions.listenExpenses();
        console.log(this.props.expenses);
    }

    componentWillUnmount() {
        // this.firebaseRef.off();
    }


    addTransaction (value) {
        this.props.actions.addTransaction(value);
    }

    render(){
        return (
            <div>
                <TransactionList transactions={this.props.expenses}/>
                <TransactionForm addTransaction={this.addTransaction.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        authenticated: state.authReducer.authenticated,
        user: state.authReducer.user,
        expenses: state.transactionsReducer.expenses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
