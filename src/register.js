import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import ErrorMessage from "./errormessage";
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <form id="form" method="post">
                <div id="register">
                    <input
                        id="firstname"
                        placeholder="first name"
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    />
                    <input
                        id="lastname"
                        placeholder="last name"
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                    />
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
                    <button onClick={this.register} id="registerbot">
                        REGISTER
                    </button>
                </div>
                <div id="error" />
                <Link to="/login">Log in</Link>
            </form>
        );
    }
    register(e) {
        ReactDOM.render(<ErrorMessage />, document.querySelector("#error"));
        e.preventDefault();
        console.log("submit");
        console.log(this.state);
        axios
            .post("/register", this.state)
            .then(() => {
                this.props.history.push("/login");
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
