import React from 'react';
import { Input } from 'semantic-ui-react'

const TransactionForm = ({addTransaction}) => {
    let inputVal;
    return (
        <div>
            <Input
                fluid={true}
                actionPosition='left'
                placeholder='Amount eg: 32'
                onChange={(node) => { inputVal = node.target.value;  }}
                action={{
                    color: 'teal',
                    labelPosition: 'left',
                    icon: 'cart',
                    content: 'Add',
                    onClick: (event) => {
                        console.log(inputVal);
                        addTransaction(inputVal);
                    }
                }}></Input>
        </div>
    );

};

export default TransactionForm;
