import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/app.actions';

class MenuDrawer extends React.Component {

    _handleRequestChange (event) {
        this.props.actions.handleDrawerToggle();
    }

    render() {
        return (
            <div>
                <Drawer
                    open={this.props.isDrawerOpen}
                    onRequestChange={this._handleRequestChange.bind(this)}
                    disableSwipeToOpen={false}
                    docked={false}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDrawerOpen: state.app.isDrawerOpen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);
