import React from "react";

export default function ProfilePic({
    image,
    firstname,
    lastname,
    clickHandler
}) {
    return (
        <img
            alt={firstname + " " + lastname}
            onClick={clickHandler}
            src={image || "/default.jpg"}
        />
    );
}
