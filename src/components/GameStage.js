import React from "react";
import "./GameStage.css";

const GameStage = (props) => {
    const {name} = props.data;

    return (
        <div className="stage">
            {name}
        </div>
    )
}

export default GameStage;