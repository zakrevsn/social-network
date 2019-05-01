import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     axios.get("/user").then(({ data }) => {
    //         this.setState(data);
    //         console.log(data);
    //     });
    // }
    render() {
        return (
            <div className="profile">
                <ProfilePic
                    image={this.props.image}
                    firstname={this.props.firstname}
                    lastname={this.props.lastname}
                    clickHandler={this.props.clickHandler}
                />
                <div className="name">
                    {this.props.firstname} {this.props.lastname}
                </div>
                {this.props.bioEditor}
            </div>
        );
    }
}
