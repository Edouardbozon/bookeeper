import React from 'react';

const TransactionForm = ({addTransaction}) => {
    let input;

    return (
        <div>
            <input type="number" ref={ node => {
                input = node
            }}/>
            <button onClick={() => {
                addTransaction(input.value);
                input.value = null;
            }}>
            +
            </button>
        </div>
    );

};

export default TransactionForm;
