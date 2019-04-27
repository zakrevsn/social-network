import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Logo from "./start";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                ...data
            });
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
                    image={this.state.image}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
                {this.state.isUploaderVisible && <Uploader />}
            </div>
        );
    }
}
