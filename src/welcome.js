import React from "react";
import Logo from "./start";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./register";
export default function Welcome() {
    return (
        <div>
            <div className="welcome">Welcome</div>
            <Logo />
            <HashRouter>
                <div className="link">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
