import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/app.actions';
import Navbar from './navbar.component';

class Bookkeeper extends Component {

    constructor (props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Navbar navlinks={'hey'}></Navbar>
                { this.props.authenticated ? 'lol' : 'paslol'}
                { this.props.children }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookkeeper);
