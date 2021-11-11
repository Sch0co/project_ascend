import React from "react";
import "./GameStage.css";
import { ReactComponent as Lock } from "../icon/mainIcon/lock.svg";

const GameStage = (props) => {
    if(!props.isCleared)
    {
        return (
            <div
                className="stage"
            >
                <Lock />
            </div>
        )
    }

    return (
        <div
            className="stage"
            style={{
                backgroundImage: `url(${props.data.monsterUrl})`,
                backgroundSize: "cover",
            }}
        >
        </div>
    )
}

export default GameStage;