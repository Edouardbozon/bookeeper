import generateSharedFlatModel from '../models/shared-flat.model';

const sharedFlatPattern = 'shared-flat/';

export const handleList = (sharedFlatData) => {
    return {
        type: '@@shared-flat:HANDLE_SHARED_FLAT',
        payload: sharedFlatData
    }
};

export const handleCreate = () => {
    return {
        type: '@@shared-flat:CREATE_SHARED_FLAT'
    }
};

export const handleDelete = () => {
    return {
        type: '@@shared-flat:DELETE_SHARED_FLAT'
    }
};

export const handleJoinSharedFlat = () => {
    return {
        type: '@@shared-flat:JOIN_SHARED_FLAT'
    }
};

export const createSharedFlat = (formData) => {
    return function (dispatch) {
        // const sharedFlatModel = generateSharedFlatModel({
        //     name: formData.name,
        //     location: formData.location,
        //     userId: firebase.auth().currentUser.uid
        // });
        // sharedFlatRef.push(sharedFlatModel);
        dispatch(handleCreate());
    }
};

export const getSharedFlats = () => {
    return function (dispatch) {
        // sharedFlatRef.on('value', (snapshot) => {
        //     const sharedFlats = {};
        //     snapshot.forEach((data) => {
        //         sharedFlats[data.key] = data.val();
        //     });
        //     dispatch(handleList(sharedFlats));
        // });
    }
};

export const joinSharedFlat = (sharedFlat, uid) => {
    return function (dispatch) {
        console.log(sharedFlat);
        console.log(uid);
        // firebase.database().ref()
        //     .child(sharedFlatPattern + uid)
        //     .update({
        //         countRoomMates: ++sharedFlat.countRoomMates,
        //         roomMates: sharedFlat.roomMates.concat(['me'])
        //     });
        dispatch(handleJoinSharedFlat());
    }
};

// export const removeExpense = (key) => {
//     return (dispatch) => {
//         expensesFirebaseRef.child(key).remove();
//         dispatch(handleRemoveExpense());
//     }
// }
