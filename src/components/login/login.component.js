import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/auth.actions';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

class LoginForm extends Component {

    _handleEmailChange(event) {
        this.props.actions.handleLoginEmailChange(event.target.value);
    }

    _handlePasswordChange(event) {
        this.props.actions.handleLoginPasswordChange(event.target.value);
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.actions.signIn(this.props.loginFormData);
    }

    render() {
        return (
            <Card>
                {
                    this.props.error ?
                        <div>
                            { this.props.error.message }
                        </div> :
                        null
                }
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <CardTitle
                        title="Track your roommate expenses"
                        subtitle="Sign up to create an account">
                    </CardTitle>
                    <CardText>
                        <TextField
                            onChange={this._handleEmailChange.bind(this)}
                            placeholder="edouard@gmail.com"
                            type="email"
                            label="Email"
                            name="email"
                            fullWidth={true}
                            required/>
                        <br/>
                        <TextField
                            onChange={this._handlePasswordChange.bind(this)}
                            placeholder="******"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            required/>
                    </CardText>
                    <CardActions>
                        <Link to='/signup'>
                            <RaisedButton label="Sign up" primary={false} type="button"/>
                        </Link>
                        <RaisedButton label="Login" primary={true} type="submit"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
