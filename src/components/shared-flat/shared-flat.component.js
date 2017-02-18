import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/shared-flat.actions';
import SearchSharedFlat from './search-shared-flat.component';
import ListSharedFlat from './list-shared-flat.component';
import CreateSharedFlat from './create-shared-flat.component';

class SharedFlat extends Component {

    componentWillMount() {
        this.props.actions.getSharedFlats();
    }

    _handleSubmit(formData) {
        this.props.actions.createSharedFlat(formData);
    }

    joinSharedFlat(sharedFlat) {
        this.props.actions.joinSharedFlat(sharedFlat);
    }


    // <SearchSharedFlat/>
    render(){
        const { sharedFlats } = this.props;
        return (
            <div>
                <CreateSharedFlat onSubmit={this._handleSubmit.bind(this)} />
                <ListSharedFlat sharedFlats={sharedFlats} joinSharedFlat={this.joinSharedFlat.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sharedFlats: state.sharedFlat.sharedFlats
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedFlat);
