import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Logo from "./start";
import Uploader from "./uploader";
import Profile from "./profile";
import { Route, BrowserRouter, Link } from "react-router-dom";
import OtherProfile from "./otherprofile";
import BioEditor from "./bioeditor";
import Friends from "./friends";
import OnlineUsers from "./onlineusers";
import Chat from "./chat";
import { connect } from "react-redux";
class App extends React.Component {
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
        axios
            .get("/user")
            .then(({ data }) => {
                if (!data.id) {
                    this.setState({ failed: true });
                }
                this.setState(data);
                console.log(data);
            })
            .catch(() => {
                this.setState({ failed: true });
            });
    }
    render() {
        if (!this.state.id) {
            // if (this.state.failed) {
            //     this.props.history.push("/welcome");
            //     return;
            // } else {
            return (
                <div>
                    Hang on!
                    <img src="/spinner.gif" />
                </div>
            );
            // }
        }
        return (
            <BrowserRouter>
                <div className="maindiv">
                    <div className="top">
                        <Logo />
                        <div className="links">
                            <a href="/logout">Logout</a>
                            <a>
                                <Link to="/friends">
                                    Friends{" "}
                                    {this.props.requests
                                        ? " (" +
                                          this.props.requests +
                                          " Requests)"
                                        : ""}
                                </Link>
                            </a>
                            <a>
                                <Link to="/chat">Chat</Link>
                            </a>
                            <a>
                                <Link to="/online">Users online</Link>
                            </a>
                            <a>
                                <Link to="/">My profile</Link>
                            </a>
                        </div>
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
                                userId={this.state.id}
                            />
                        )}
                    />
                    <Route path="/friends" component={Friends} />
                    <Route path="/online" component={OnlineUsers} />
                    <Route path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = state => {
    let requests = 0;
    if (!state.friends) {
        return { requests };
    }
    for (let i in state.friends) {
        if (!state.friends[i].accepted) {
            requests += 1;
        }
    }
    return { requests };
};

export default connect(mapStateToProps)(App);
