import React from "react";
import ProfilePic from "./profilepic";
import { receiveFriends, acceptRequest, unfriend } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }
    render() {
        let requests = [],
            friends = [];

        for (let i in this.props.wannabes) {
            let request = this.props.wannabes[i];
            requests.push(
                <div key={request.id}>
                    <Link to={"user/" + request.id}>
                        <ProfilePic
                            image={request.profilepic}
                            firstname={request.firstname}
                            lastname={request.lastname}
                        />
                        {request.firstname} {request.lastname}
                    </Link>
                    <button
                        className="accept"
                        onClick={() =>
                            this.props.dispatch(acceptRequest(request.id))
                        }
                    >
                        Accept
                    </button>
                    <button
                        className="decline"
                        onClick={() =>
                            this.props.dispatch(unfriend(request.id))
                        }
                    >
                        Decline
                    </button>
                </div>
            );
        }
        for (let i in this.props.friends) {
            let friend = this.props.friends[i];
            friends.push(
                <div key={friend.id}>
                    <Link to={"user/" + friend.id}>
                        <ProfilePic
                            image={friend.profilepic}
                            firstname={friend.firstname}
                            lastname={friend.lastname}
                        />
                        {friend.firstname} {friend.lastname}
                    </Link>
                    <button
                        className="unfriend"
                        onClick={() => this.props.dispatch(unfriend(friend.id))}
                    >
                        Unfriend
                    </button>
                </div>
            );
        }

        return (
            <div className="friendslist">
                <div className="wannabes">
                    These people want to be your friends
                    {requests}
                </div>
                <div className="friends">
                    These people are currently your friends
                    {friends}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let wannabes = [];
    let friends = [];
    for (let i = 0; state.friends && i < state.friends.length; i++) {
        if (state.friends[i].accepted == true) {
            friends.push(state.friends[i]);
        } else {
            wannabes.push(state.friends[i]);
        }
    }
    return { wannabes, friends };
}
export default connect(mapStateToProps)(Friends);
