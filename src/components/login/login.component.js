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
        const style = { marginTop: '16px'};
        return (
            <div>
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
                            title="Login"
                            subtitle="Welcome home">
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
                            <RaisedButton label="Login" primary={true} type="submit"/>
                        </CardActions>
                    </form>
                </Card>
                <Card style={style}>
                    <CardTitle
                        title="Create an account"
                        subtitle="Track your roomates common expenses">
                    </CardTitle>
                    <CardActions>
                        <Link to='/signup'>
                            <RaisedButton label="Sign up" primary={false} type="button"/>
                        </Link>
                    </CardActions>
                </Card>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        error: state.auth.error,
        loginFormData: state.auth.loginFormData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
