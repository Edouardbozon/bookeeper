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
                {
                    this.props.isMobile ?
                    <main>{ this.props.children }</main> :
                    <main>Sorry, this app support only mobile devices.</main>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isMobile: state.app.isMobile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookkeeper);
