import React from 'react';

const Transaction = ({transaction}) => {
    return (
        <li>
            <small>{ transaction.author.email }</small> <strong>{ transaction.price }€</strong>
        </li>
    );
}

const TransactionList = ({transactions}) => {

    const transactionNode = transactions.map((transaction) => {
        return (
            <Transaction transaction={transaction} key={transaction._key} id={transaction._key}/>
        );
    });

    let total = 0;

    const getTotalPrice = (transactions) => {
        transactions.map((transaction) => {
            total += parseFloat(transaction.price, 0);
            return total;
        });
    };

    return (
        <div>
            <ul>
                { transactionNode }
            </ul>
            { getTotalPrice(transactions) }
            <strong>Total: { total }</strong>
        </div>
    );
};

export default TransactionList;
