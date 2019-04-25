import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
import qs from "qs";

const axiosConfig = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var self = this;
        return (
            <form id="form" method="post">
                <div id="register">
                    <input
                        id="firstname"
                        placeholder="first name"
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onInput={e => this.handleInput(e, self)}
                    />
                    <input
                        id="lastname"
                        placeholder="last name"
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onInput={e => this.handleInput(e, self)}
                    />
                    <input
                        id="email"
                        placeholder="email"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onInput={e => this.handleInput(e, self)}
                    />
                    <input
                        id="password"
                        placeholder="password"
                        name="password"
                        type="password"
                        onInput={e => this.handleInput(e, self)}
                    />
                </div>
                <div id="button">
                    <button
                        onClick={e => this.handleSubmit(e, self)}
                        id="register"
                    >
                        REGISTER
                    </button>
                </div>
            </form>
        );
    }
    handleSubmit(e, self) {
        e.preventDefault();
        console.log("submit");
        console.log(self.state);
        axios
            .post("/register", qs.stringify(self.state), axiosConfig)
            .then(data => {
                // location.replace("/");
                console.log(data);
            })
            .catch(data => {
                console.log(data);
                return "Error message";
            });
    }
    handleInput(e, self) {
        console.log("input");
        self.setState({
            [e.target.name]: e.target.value
        });
    }
}
ReactDOM.render(<RegisterForm />, document.querySelector("main"));
