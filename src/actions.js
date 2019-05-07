import axios from "./axios";

export function receiveFriends() {
    return axios.get("/friendship").then(({ data }) => {
        console.log(data);
        return {
            friends: data,
            type: "RECEIVE_FRIENDS"
        };
    });
}

export function acceptRequest(id) {
    return axios.put("/friendship/" + id).then(() => {
        console.log("ACCEPT_FRIEND_REQUEST", id);
        return {
            id: id,
            type: "ACCEPT_FRIEND_REQUEST"
        };
    });
}

export function unfriend(id) {
    return axios.delete("/friendship/" + id).then(() => {
        console.log("UNFRIEND", id);
        return {
            id: id,
            type: "UNFRIEND"
        };
    });
}
