import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import {
  // Checkbox,
  // RadioButtonGroup,
  // SelectField,
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

const validate = (values) => {
    const errors = {};
    if (values.password !== values.repeatPassword) {
        errors.password = 'Invalid passwords, they are not similar.'
        errors.repeatPassword = 'Invalid passwords, they are not similar.'
    }
    if (values.password && values.password.length < 6) {
        errors.password = 'Invalid password, minimun 6 characters.'
    }
    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = `Invalid email, please don't lie to me.`
    }
    return errors;
};

class SignupForm extends Component {

    componentDidMount() {
        this.refs.username
            .getRenderedComponent() // return Field
            .getRenderedComponent() // return TextField
            .focus();
    }

    render() {
        const { pristine, submitting, handleSubmit } = this.props;
        return (
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardTitle
                        title="Create an account"
                        subtitle="and start to track your roomates common expenses">
                    </CardTitle>
                    <CardText>
                        <Field
                            component={TextField}
                            floatingLabelText="Username"
                            hintText="e.g. EddyMalou"
                            type="text"
                            label="username"
                            withRef
                            ref="username"
                            name="username"
                            fullWidth={true}
                            validate={required}/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Email"
                            hintText="e.g. eddy-malou@gmail.com"
                            type="email"
                            label="Email"
                            name="email"
                            fullWidth={true}
                            validate={required}/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Password"
                            hintText="e.g. Jfdh54"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            validate={required}/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Repeat password"
                            hintText="e.g. Jfdh54"
                            type="password"
                            label="Password"
                            name="repeatPassword"
                            fullWidth={true}
                            validate={required}/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Country"
                            hintText="e.g. France"
                            type="text"
                            label="country"
                            name="country"
                            fullWidth={true}
                            validate={required}/>
                    </CardText>
                    <CardActions>
                        <Link to='/login'>
                            <RaisedButton label="Login" primary={false} type="button"/>
                        </Link>
                        <RaisedButton label="Sign up" primary={true} disabled={pristine || submitting} type="submit"/>
                    </CardActions>
                </form>
            </Card>
        );
    }

};

// Decorate the form component
export default reduxForm({
    form: 'signupForm',
    validate
})(SignupForm);
