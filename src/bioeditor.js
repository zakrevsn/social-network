import React from "react";
import axios from "./axios";
export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            bio: props.bio
        };
        this.save = this.save.bind(this);
    }
    render() {
        if (this.state.editing) {
            // show input field
            return (
                <div className="bio">
                    <textarea
                        value={this.state.bio}
                        className="textfield"
                        onChange={e => this.setState({ bio: e.target.value })}
                    />
                    <button className="save" type="submit" onClick={this.save}>
                        Save
                    </button>
                </div>
            );
        } else if (!this.state.bio) {
            // show "Add your bio now"
            return (
                <div className="bio">
                    <a onClick={() => this.setState({ editing: true })}>
                        Add your bio now
                    </a>
                </div>
            );
        } else {
            // show bio and link to Edit
            return (
                <div className="bio">
                    <div className="biotext">{this.state.bio}</div>
                    <a onClick={() => this.setState({ editing: true })}>Edit</a>
                </div>
            );
        }
    }
    save() {
        var self = this;

        this.setState({
            error: false
        });
        self.setState({ editing: false });
        axios
            .post("/bio", { bio: this.state.bio })
            .then(function(res) {
                console.log("hello", res.data, self.props.setBio);
                self.props.setBio(res.data[0].bio);
            })
            .catch(() => {
                self.setState({
                    error: true
                });
            });
    }
}
