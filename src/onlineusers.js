import React from "react";
import ProfilePic from "./profilepic";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let users = [];

        for (let i in this.props.users) {
            let user = this.props.users[i];
            if (!user) {
                continue;
            }
            users.push(
                <div key={user.userId}>
                    <Link to={"user/" + user.userId}>
                        <ProfilePic
                            image={user.profilepic}
                            firstname={user.firstname}
                            lastname={user.lastname}
                        />
                        {user.firstname} {user.lastname}
                    </Link>
                </div>
            );
        }
        return (
            <div className="onlinelist">
                <p>These people are currently online</p>
                {users}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { users: state.onlineUsers };
}
export default connect(mapStateToProps)(OnlineUsers);
