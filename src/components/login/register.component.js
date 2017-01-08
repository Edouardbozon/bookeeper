import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/auth.actions';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

class RegisterForm extends Component {

    _handleEmailChange(event) {
        this.props.actions.handleEmailChange(event.target.value);
    }

    _handlePasswordChange(event) {
        this.props.actions.handlePasswordChange(event.target.value);
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.actions.signIn(this.props.loginFormData);
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
                        <TextField
                            onChange={this._handlePasswordChange.bind(this)}
                            placeholder="Username e.g. EddyMalou"
                            type="text"
                            label="username"
                            name="username"
                            fullWidth={true}
                            required/>
                        <br/>
                        <TextField
                            onChange={this._handleEmailChange.bind(this)}
                            placeholder="Email e.g. eddy-malou@gmail.com"
                            type="email"
                            label="Email"
                            name="email"
                            fullWidth={true}
                            required/>
                        <br/>
                        <TextField
                            onChange={this._handlePasswordChange.bind(this)}
                            placeholder="Password"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            required/>
                        <br/>
                        <TextField
                            onChange={this._handlePasswordChange.bind(this)}
                            placeholder="Repeat password"
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth={true}
                            required/>
                        <br/>
                        <TextField
                            onChange={this._handlePasswordChange.bind(this)}
                            placeholder="Country"
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

function mapStateToProps(state) {
    return {
        error: state.authReducer.error,
        registerFormData: state.authReducer.registerFormData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
