import React, { Component } from 'react';
import * as Actions from '../../actions/auth.actions';
import SignupForm from './signup-form.component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';


class Signup extends Component {

    _handleSubmit(formData) {
        this.props.actions.signup(formData);
    }

    render() {
        const { error, code, message } = this.props;
        return (
            <div>
                { error ?
                <Card>
                    <CardTitle>{ code }</CardTitle>
                    <CardText>{ message }</CardText>
                </Card> : null }
                <SignupForm onSubmit={this._handleSubmit.bind(this)} />
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
