import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}
export default function Logo() {
    return (
        <div className="logo">
            <img src="/logo.jpg" />
        </div>
    );
}

ReactDOM.render(
    <div>
        <h1 className="site-header">Secret society</h1>
        {elem}
    </div>,
    document.querySelector("main")
);
