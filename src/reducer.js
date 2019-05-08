// 'RECEIVE_FRIENDS', 'ACCEPT_FRIEND_REQUEST', 'UNFRIEND'

export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        return Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        console.log(state, action);
        let newState = Object.assign({}, state);
        for (let i = 0; newState.friends && i < newState.friends.length; i++) {
            if (newState.friends[i].id == action.id) {
                newState.friends[i].accepted = true;
            }
        }
        return newState;
    }
    if (action.type == "UNFRIEND") {
        let friends = [];
        for (let i = 0; state.friends && i < state.friends.length; i++) {
            if (state.friends[i].id != action.id) {
                friends.push(state.friends[i]);
            }
        }
        return Object.assign({}, state, {
            friends: friends
        });
    }
    if (action.type == "ONLINE_USERS") {
        return Object.assign({}, state, {
            onlineUsers: action.users
        });
    }

    return state;
}
