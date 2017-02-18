import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import {
  // Checkbox,
  RadioButtonGroup,
  AutoComplete,
  TextField
  // Toggle
} from 'redux-form-material-ui';
// import MenuItem from 'material-ui/MenuItem';
// import { RadioButton } from 'material-ui/RadioButton';

const required = (value) => {
    if (value == null) {
        return 'Required'
    }
    return undefined;
};

class CreateSharedFlat extends Component {

    componentDidMount() {
        this.refs.name
            .getRenderedComponent() // return Field
            .getRenderedComponent() // return TextField
            .focus();
    }

    render() {
        const { pristine, submitting, handleSubmit } = this.props;
        const dataSource = ['Address 1', 'Address 2'];
        return (
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardTitle title="Create a shared flat"></CardTitle>
                    <CardText>
                        <Field
                            component={TextField}
                            floatingLabelText="Name"
                            hintText="e.g. Da_best_shared_flat_from_LA"
                            type="text"
                            label="name"
                            withRef
                            ref="name"
                            name="name"
                            fullWidth={true}
                            validate={required}/>
                        <Field
                            component={AutoComplete}
                            floatingLabelText="Location"
                            hintText="e.g. 31, chemin du Sapin"
                            type="location"
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={dataSource}
                            label="Location"
                            name="location"
                            fullWidth={true}
                            validate={required}/>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="new" primary={true} disabled={pristine || submitting} type="submit"/>
                    </CardActions>
                </form>
            </Card>
        );
    }

};

// Decorate the form component
export default reduxForm({
    form: 'createSharedFlat'
})(CreateSharedFlat);
