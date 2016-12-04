import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/app.actions';

class SignInForm extends Component {

    constructor (props) {
        super(props);
    }

    handleEmailChange(event) {
        console.log(this.props);
        this.props.actions.handleEmailChange(event.target.value);
    }

    handlePasswordChange(event) {
        console.log(this.props);
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
                { email }
                { this.props.error ?
                    <div>
                        { this.props.error.message }
                    </div> :
                    null }
                <form name="signInForm" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Email</label>
                        <input
                            onChange={this.handleEmailChange.bind(this)}
                            name="email"
                            type="email"
                            required/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            onChange={this.handlePasswordChange.bind(this)}
                            name="password"
                            type="password"
                            required/>
                    </div>
                    <button type="submit">
                         Sign in
                    </button>
                </form>
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
