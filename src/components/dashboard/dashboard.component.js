import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/expenses.actions';
import ExpenseForm from './expense-form.component';
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

        const wrapperStyle = {
            position: 'relative'
        };

        return (
            <div style={wrapperStyle}>
                <ExpenseList expenses={this.props.expenses}/>
                <ExpenseForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authReducer.authenticated,
        expenses: state.expenseReducer.expenses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
