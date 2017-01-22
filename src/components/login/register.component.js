import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/auth.actions';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';

const validate = (values) => {
    const errors = {}
    const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'notes'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

class SignupForm extends Component {

    _handleSubmit(event) {
        event.preventDefault();
        this.props.actions.signup(this.props.signupFormData);
    }

    render() {
        return (
            <Card>
                { this.props.error ?
                    <div>
                        { this.props.error.message }
                    </div> :
                    null }
                <form onSubmit={this._handleSubmit.bind(this)}>
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
                            ref="firstField"
                            name="username"
                            fullWidth={true}
                            required/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Email"
                            hintText="e.g. eddy-malou@gmail.com"
                            type="email"
                            label="Email"
                            name="email"
                            fullWidth={true}
                            required/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Password"
                            hintText="e.g. Jfdh54"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            required/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Repeat password"
                            hintText="e.g. Jfdh54"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            required/>
                        <br/>
                        <Field
                            component={TextField}
                            floatingLabelText="Country"
                            hintText="e.g. France"
                            type="text"
                            label="country"
                            name="country"
                            fullWidth={true}
                            required/>
                    </CardText>


                    <CardActions>
                        <Link to='/login'>
                            <RaisedButton label="Login" primary={false} type="button"/>
                        </Link>
                        <RaisedButton label="Sign up" primary={true} type="submit"/>
                    </CardActions>
                </form>
            </Card>
        );
    }

};

// Decorate the form component
SignupForm = reduxForm({
  form: 'signupForm'
})(SignupForm);

export default SignupForm;
