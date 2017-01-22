import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../actions/app.actions';
import * as AuthActions from '../../actions/auth.actions';

class MenuDrawer extends React.Component {

    _handleRequestChange (event) {
        this.props.appActions.handleDrawerToggle();
    }

    _handleDisconnect () {
        this.props.authActions.logout();
        this.props.appActions.handleDrawerToggle();
    }

    render() {
        const { authenticated, isDrawerOpen } = this.props;
        return (
            <div>
                <Drawer
                    open={isDrawerOpen}
                    onRequestChange={this._handleRequestChange.bind(this)}
                    disableSwipeToOpen={false}
                    docked={false}>
                    { authenticated ?
                    <MenuItem onClick={this._handleDisconnect.bind(this)}>Disconnect</MenuItem> : null }
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDrawerOpen: state.app.isDrawerOpen,
        authenticated: state.auth.authenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(AppActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);
