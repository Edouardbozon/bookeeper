import React from 'react';
import TextField from 'material-ui/TextField';

const ExpenseForm = ({addExpense}) => {
    let inputVal;
    return (
        <div>
            <TextField
                fullWidth="true"
                id="add-expense"
                actionPosition='left'
                placeholder='Amount eg: 32'
                />
        </div>
    );

};

export default ExpenseForm;

// onChange={(node) => { inputVal = node.target.value;  }}
// action={{
//     color: 'teal',
//     labelPosition: 'left',
//     icon: 'cart',
//     content: 'Add',
//     onClick: (event) => {
//         console.log(inputVal);
//         addTransaction(inputVal);
//     }
// }}
