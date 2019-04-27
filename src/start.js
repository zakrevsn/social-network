import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Welcome from "./welcome";

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img src="/images/logo.png" />;
}
export default function Logo() {
    return (
        <div className="logo">
            <img src="/images/logo.png" />
        </div>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
