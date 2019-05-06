// 'RECEIVE_FRIENDS', 'ACCEPT_FRIEND_REQUEST', 'UNFRIEND'

export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        return Object.assign({}, state, {
            friends: action.friends
        });
    }
    return state;
}
