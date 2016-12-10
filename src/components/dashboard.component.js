import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/transactions.actions';
import TransactionForm from './form.component';
import ExpenseList from './expense-list.component';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.listenExpenses();
    }

    componentWillUnmount() {

    }

    addTransaction (value) {
        this.props.actions.addExpense(value);
    }

    render(){
        return (
            <div>
                <ExpenseList expenses={this.props.expenses}/>
                <TransactionForm addTransaction={this.addTransaction.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
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
