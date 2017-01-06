import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth.actions';

import Navbar from './partials/navbar.component';
import './app.style.scss';

class Bookkeeper extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar authenticated={this.props.authenticated} routes={'hey'}></Navbar>
                <div>{ this.props.children }</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authenticated,
        error: state.error,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookkeeper);
