import React from "react";
export default function ErrorMessage(props) {
    let res = props.res;
    console.log("err message", res);
    if (!res || res.status < 400) {
        console.log("no error");
        return <div />;
    } else {
        console.log("error");
        return <div className="error">{res.data || "An error occured."}</div>;
    }
}
