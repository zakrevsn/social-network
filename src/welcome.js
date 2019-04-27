import React from "react";
import Logo from "./start";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./register";
export default function Welcome() {
    return (
        <div>
            <div>Welcome</div>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
