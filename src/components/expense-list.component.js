import React from 'react';

const Expense = ({expense}) => {
    return (
        <li>
            <strong>{ expense.amount }</strong>
        </li>
    );
}

const ExpenseList = ({expenses}) => {

    const expenseNode = Object.keys(expenses).map((key) => {
        return (
            <Expense expense={expenses[key]} key={key} id={key}/>
        );
    });

    let total = 0;

    const getTotalPrice = (expenses) => {
        Object.keys(expenses).map((key) => {
            total += parseFloat(expenses[key].amount, 0);
            return total;
        });
    };

    return (
        <div>
            <ul>
                { expenseNode }
            </ul>
            { getTotalPrice(expenses) }
            <strong>Total: { total }</strong>
        </div>
    );
};

export default ExpenseList;
