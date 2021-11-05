import React from "react";
import "./GameStage.css";

const GameStage = (props) => {
    const {stageCount} = props.data;

    return (
        <div className="stage">
            {stageCount}
        </div>
    )
}

export default GameStage;