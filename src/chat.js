import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { chat: [] };
    }
    componentDidUpdate() {
        this.myDiv.scrollTop = this.myDiv.scrollHeight;
    }

    handleInput(e) {
        if (e.which === 13) {
            console.log("handleInput");
            var newChat = e.target.value;
            socket.emit("newChatMessage", newChat);
            e.target.value = "";
        }
    }

    render() {
        let messages = [];
        for (let i in this.props.chat) {
            console.log(i);
            messages.push(
                <div className="message" key={i}>
                    <Link to={"user/" + this.props.chat[i].userId}>
                        <ProfilePic
                            image={this.props.chat[i].profilepic}
                            firstname={this.props.chat[i].firstname}
                            lastname={this.props.chat[i].lastname}
                        />
                        {this.props.chat[i].firstname}{" "}
                        {this.props.chat[i].lastname}
                    </Link>
                    {} on {this.props.chat[i].timestamp}:
                    <div className="messagetext">
                        {this.props.chat[i].message}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <h1>Chat!</h1>
                <div className="chat-container">
                    <div
                        className="messages"
                        ref={chatsContainer => (this.myDiv = chatsContainer)}
                    >
                        {messages}
                    </div>
                    <textarea onKeyDown={this.handleInput} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("mapStateToProps", state.chat);
    return { chat: state.chat };
};

export default connect(mapStateToProps)(Chat);
