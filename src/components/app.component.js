import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth.actions';
import MenuDrawer from './partials/drawer.component';
import Navbar from './partials/navbar.component';
import './app.style.scss';

class Bookkeeper extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <MenuDrawer/>
                <main>{ this.props.children }</main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authReducer.authenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookkeeper);
