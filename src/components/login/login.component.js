import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/auth.actions';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';


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
            <Card>
                { this.props.error ?
                    <div>
                        { this.props.error.message }
                    </div> :
                    null }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <CardTitle
                        title="Login to start tracking all your roomates expenses"
                        subtitle="Or sig nup if you doesn't have account anymore">
                    </CardTitle>
                    <CardText>
                        <TextField
                            onChange={this.handleEmailChange.bind(this)}
                            placeholder="email"
                            type="email"
                            label="Email"
                            name="email"
                            required/>
                        <br/>
                        <TextField
                            onChange={this.handlePasswordChange.bind(this)}
                            placeholder="password"
                            type="password"
                            label="Password"
                            name="password"
                            required/>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="Login" primary={true} type="submit"/>
                        <RaisedButton label="Sign up" primary={false} type="button"/>
                    </CardActions>
                </form>
            </Card>
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
