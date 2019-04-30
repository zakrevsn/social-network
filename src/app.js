import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Logo from "./start";
import Uploader from "./uploader";
import Profile from "./profile";
import BroserRouter from "react";
export default class App extends React.Component {
    setProfilepic(url) {
        this.setState({ profilepic: url });
    }

    closeUpload() {
        this.setState({ isUploaderVisible: false });
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.closeUpload = this.closeUpload.bind(this);
        this.setProfilepic = this.setProfilepic.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            // this.setState({
            //     ...data
            // });
            this.setState(data);
            console.log(data);
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    Hang on!
                    <img src="/spinner.gif" />
                </div>
            );
        }
        return (
            <div>
                <Logo />
                <ProfilePic
                    image={this.state.profilepic}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && (
                    <Uploader
                        closeUpload={this.closeUpload}
                        setProfilepic={this.setProfilepic}
                    />
                )}
                <hr />
                <Profile
                    image={this.state.profilepic}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
            </div>
        );
    }
}
