import React from 'react';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/app.actions';

class Appbar extends React.Component {

    handleToggleBar () {
        this.props.actions.handleDrawerToggle();
    }

    render() {
        return (
            <AppBar
                title="Bookkeeper"
                onLeftIconButtonTouchTap={this.handleToggleBar.bind(this)}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
