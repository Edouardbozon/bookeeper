import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/expenses.actions';

class ExpenseForm extends React.Component {

    constructor (props) {
        super(props);
    }

    _handleAddExpense () {
        this.props.actions.addExpense(this.props.expenseInputValue);
    }

    _handleExpenseInput(event) {
        this.props.actions.handleInputExpenseChange(event.target.value);
    }

    render () {

        const buttonStyle = {
            marginTop: '12px',
            float: 'right'
        };

        const wrapperStyle = {
            position: 'absolute',
            left: '4%',
            right: '4%',
            bottom: '4%'
        }

        return (
            <div style={wrapperStyle}>
                <Card>
                    <CardText>
                        <TextField
                            fullWidth={true}
                            id="add-expense"
                            type="number"
                            placeholder='Amount e.g. 32'
                            value={this.props.expenseInputValue}
                            onChange={ this._handleExpenseInput.bind(this) }/>
                    </CardText>
                </Card>
                <RaisedButton
                    primary={true}
                    style={buttonStyle}
                    label="Add"
                    onTouchTap={this._handleAddExpense.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        expenseInputValue: state.expenseReducer.expenseInputValue
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
