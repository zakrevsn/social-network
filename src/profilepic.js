import React from 'react';

export default function ProfilePic({ image, first, last, clickHandler }) {
    return <img onClick={clickHandler} src={image || '/default.jpg'} />
}
