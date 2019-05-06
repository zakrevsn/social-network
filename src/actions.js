import axios from "./axios";

export default function receiveFriends() {
    return axios.get("/friendship").then(({ data }) => {
        console.log(data);
        return {
            friends: data,
            type: "RECEIVE_FRIENDS"
        };
    });
}
