import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./login";
import Registration from "./welcome";
function Logo() {
    return (
        <div className="logo">
            <img src="/images/logo.png" />
        </div>
    );
}
function Welcome() {
    let page;
    if (location.pathname == "/welcome") {
        page = <Registration />;
    } else if (location.pathname == "/login") {
        page = <Login />;
    } else if (location.pathname == "/") {
        page = <Logo />;
    }
    return (
        <div>
            <div>Welcome</div>
            {page}
        </div>
    );
}
ReactDOM.render(
    <BrowserRouter>
        <Welcome />
    </BrowserRouter>,
    document.querySelector("main")
);
