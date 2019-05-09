import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft, messages } from "./actions";
// import Chat from "./chat";

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
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", userId => {
            console.log("userLeft", userId);
            store.dispatch(userLeft(userId));
        });

        socket.on("Message", chat => {
            console.log("Message", chat);
            store.dispatch(messages(chat));
        });
    }
}
