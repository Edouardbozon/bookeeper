const sharedFlatReducer = (state = {
    sharedFlats: {}
}, action) => {
    switch (action.type) {
        case '@@shared-flat:HANDLE_SHARED_FLAT':
        console.log(action.payload);
            return {
                sharedFlats: action.payload
            };
        case '@@shared-flat:CREATE_SHARED_FLATS':
        case '@@shared-flat:JOIN_SHARED_FLAT':
            return state;
        default:
            return state;
    }
}

export default sharedFlatReducer;
