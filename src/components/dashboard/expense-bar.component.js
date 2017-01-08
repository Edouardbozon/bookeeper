import React from 'react';
import TextField from 'material-ui/TextField';

const ExpenseBar = ({addTransaction}) => {
    let inputVal;
    return (
        <div>
            <TextField
                fluid={true}
                actionPosition='left'
                placeholder='Amount eg: 32'
                />
        </div>
    );

};

export default ExpenseBar;
