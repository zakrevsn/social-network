import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput(e) {
        if (e.which === 13) {
            console.log("handleInput");
            var newChat = e.target.value;
            socket.emit("newChatMessage", newChat);
        }
    }

    render() {
        return (
            <div>
                <h1>Chat!</h1>
                <div className="chat-container">
                    <textarea onKeyDown={this.handleInput} />
                    ref = {chatsContainer => (this.myDiv = chatsContainer)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(Chat);
