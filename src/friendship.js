import React from "react";
import axios from "./axios";
export default class Friendship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.requestFriendship = this.requestFriendship.bind(this);
        this.acceptFriendship = this.acceptFriendship.bind(this);
        this.deleteFriendship = this.deleteFriendship.bind(this);
    }
    componentDidMount() {
        axios.get("/friendship/" + this.props.otherUserId).then(({ data }) => {
            console.log(data);
            if (data) {
                this.setState(data);
            }
            this.setState({ loaded: true });
        });
    }
    render() {
        if (!this.state.loaded) {
            return <div className="friendship">Loading</div>;
        }
        if (this.state.accepted) {
            return (
                <div className="friendship">
                    You are friends
                    <button onClick={this.deleteFriendship}>Unfriend</button>
                </div>
            );
        }
        if (!this.state.sender_id) {
            return (
                <div className="friendship">
                    <button onClick={this.requestFriendship}>
                        Send friend request
                    </button>
                </div>
            );
        }
        if (this.state.sender_id == this.props.userId) {
            return <div className="friendship">Friend request sent</div>;
        }
        if (this.state.recipient_id == this.props.userId) {
            return (
                <div className="friendship">
                    <button onClick={this.acceptFriendship}>
                        Accept friendship
                    </button>
                    <button onClick={this.deleteFriendship}>Decline</button>
                </div>
            );
        }
    }
    requestFriendship() {
        var self = this;

        this.setState({
            error: false
        });
        axios
            .post("/friendship/" + this.props.otherUserId)
            .then(function(res) {
                console.log(res);
                self.setState(res.data);
            })
            .catch(() => {
                self.setState({
                    error: true
                });
            });
    }
    acceptFriendship() {
        var self = this;

        this.setState({
            error: false
        });
        axios
            .put("/friendship/" + this.props.otherUserId)
            .then(function(res) {
                self.setState(res.data);
            })
            .catch(() => {
                self.setState({
                    error: true
                });
            });
    }
    deleteFriendship() {
        var self = this;

        this.setState({
            error: false
        });
        axios
            .delete("/friendship/" + this.props.otherUserId)
            .then(function() {
                self.setState({
                    sender_id: null,
                    recipient_id: null,
                    accepted: null,
                    loaded: true
                });
            })
            .catch(() => {
                self.setState({
                    error: true
                });
            });
    }
}
