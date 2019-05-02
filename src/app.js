import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Logo from "./start";
import Uploader from "./uploader";
import Profile from "./profile";
// import BrowserRouter from "react";
import { Route, BrowserRouter } from "react-router-dom";
import OtherProfile from "./otherprofile";
import BioEditor from "./bioeditor";
export default class App extends React.Component {
    setProfilepic(url) {
        this.setState({ profilepic: url });
    }
    setBio(bio) {
        this.setState({ bio: bio });
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
            <BrowserRouter>
                <div>
                    <div className="top">
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
                    </div>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <Profile
                                    image={this.state.profilepic}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    clickHandler={() =>
                                        this.setState({
                                            isUploaderVisible: true
                                        })
                                    }
                                    bioEditor={
                                        <BioEditor
                                            bio={this.state.bio}
                                            setBio={this.setBio}
                                        />
                                    }
                                />
                            );
                        }}
                    />
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
