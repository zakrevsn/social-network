import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        var self = this;
        axios.get("/user/" + id + ".json").then(({ data }) => {
            if (data.redirect) {
                self.props.history.push("/");
            } else {
                self.setState(data);
            }
        });
    }
    render() {
        return (
            <div className="profile">
                <ProfilePic
                    image={this.state.profilepic}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                />
                <div className="wrapper">
                    <div className="name">
                        {this.state.firstname} {this.state.lastname}
                    </div>
                    <div className="bio">
                        <div className="biotext">{this.state.bio}</div>
                    </div>
                </div>
            </div>
        );
    }
}
