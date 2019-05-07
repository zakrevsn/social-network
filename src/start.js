import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { init } from "./socket";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    init(store);
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
