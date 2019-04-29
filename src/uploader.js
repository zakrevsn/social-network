import React from "react";
import axios from "./axios";
export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closePopup = this.closePopup.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }
    closePopup() {
        this.props.closeUpload();
    }

    uploadFile() {
        var self = this;
        let formData = new FormData();
        formData.append(
            "file",
            document.getElementById("profilepic-input").files[0]
        );

        this.setState({
            error: false
        });

        axios
            .post("/profilepic", formData)
            .then(function(res) {
                self.props.setProfilepic(res.data[0].profilepic);
                self.closePopup();
            })
            .catch(() => {
                self.setState({
                    error: true
                });
            });
    }

    stop(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div
                className="popup"
                onClick={this.closePopup}
                onScroll={this.stop}
            >
                <div className="popup-content" onClick={this.stop}>
                    <div className="popup-x" onClick={this.closePopup}>
                        X
                    </div>
                    <h1>Add a new profile photo</h1>
                    <input
                        id="profilepic-input"
                        name="file"
                        type="file"
                        placeholder="choose file"
                        accept="image/*"
                    />
                    <button onClick={this.uploadFile}>Upload image</button>
                    {this.state.error && (
                        <div>An error occured. Try again.</div>
                    )}
                </div>
            </div>
        );
    }
}
