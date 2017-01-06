import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth.actions';



class SignInForm extends Component {

    constructor (props) {
        super(props);
    }

    handleEmailChange(event) {
        this.props.actions.handleEmailChange(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.actions.handlePasswordChange(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.signIn(this.props.loginFormData);
    }

    render() {
        const { email, password } = this.props.loginFormData;

        return (
            <div>
                { this.props.error ?
                    <div>
                        { this.props.error.message }
                    </div> :
                    null }
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Input
                        onChange={this.handleEmailChange.bind(this)}
                        placeholder="email"
                        type="email"
                        label="Email"
                        name="email"
                        required/>
                    <Form.Input
                        onChange={this.handlePasswordChange.bind(this)}
                        placeholder="password"
                        type="password"
                        label="Password"
                        name="password"
                        required/>
                    <Button primary type="submit">
                         Sign in
                    </Button>
                </Form>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        authenticated: state.authReducer.authenticated,
        user: state.authReducer.user,
        error: state.authReducer.error,
        loginFormData: state.authReducer.loginFormData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
