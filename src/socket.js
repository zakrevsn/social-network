import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", users => {
            console.log(users);
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            console.log("userJoined", user);
        });

        socket.on("userLeft", userId => {
            console.log("userLeft", userId);
        });
    }
}
