import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';


const SharedFlat = ({sharedFlat, joinSharedFlat, uid}) => {
    console.log(uid);
    return (
        <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment/>} backgroundColor={blue500} />}
            rightIcon={<ActionInfo />}
            primaryText={sharedFlat.name}
            onTouchTap={() => { joinSharedFlat(sharedFlat, uid) } }
            secondaryText={sharedFlat.location + sharedFlat.countRoomMates + 'users'}
        />
    );
};

const ListSharedFlats = ({sharedFlats, joinSharedFlat}) => {

    const sharedFlatNodes = Object.keys(sharedFlats).map((key) => {
        return (
            <SharedFlat uid={key.toString()} sharedFlat={sharedFlats[key]} joinSharedFlat={joinSharedFlat} key={key}/>
        );
    });

    return (
        <Card>
            <CardTitle
                title="Or join an existing"
                description="W">
            </CardTitle>
            <List>
                <Subheader inset={true}>Shared flats</Subheader>
                <Divider/>
                { sharedFlatNodes }
            </List>
        </Card>
    );
};

export default ListSharedFlats;
