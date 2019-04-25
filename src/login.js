import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import ErrorMessage from "./errormessage";
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <form id="form" method="post">
                <div id="login">
                    <input
                        id="email"
                        placeholder="email"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input
                        id="password"
                        placeholder="password"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                </div>
                <div id="button">
                    <button onClick={this.login} id="login">
                        LOG IN
                    </button>
                </div>
                <div id="error" />
                <Link to="/welcome">Register</Link>
            </form>
        );
    }
    login(e) {
        ReactDOM.render(<ErrorMessage />, document.querySelector("#error"));
        e.preventDefault();
        console.log("submit");
        console.log(this.state);
        axios
            .post("/login", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch(res => {
                ReactDOM.render(
                    <ErrorMessage res={res} />,
                    document.querySelector("#error")
                );
                console.log(res);
                return "Error message";
            });
    }
    handleChange(e) {
        console.log("input");
        // setState is how we put data into state
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}
