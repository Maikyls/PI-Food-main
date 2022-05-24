import React from "react";

export default function Card({ img, name, dietTypes }) {
    return (
        <div>
            <h4>{name}</h4>
            <h5>{dietTypes}</h5>
            <img src={img} alt="Recipe without pic" width="312px" height="231px" />
        </div>
    )
}
