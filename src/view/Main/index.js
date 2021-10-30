import { React, useState } from "react";
import "./index.css";
import { Modal } from "antd";
import MenuBar from "../../components/MenuBar";

const Main = () => {

  return (
    <div className="mainWindow">
      <div className="mainForm">
        <div className="mainStart">
          <div className="gameName">MonTap</div>
          <div className="startButton">
            <button className="startBtn">모험 출발</button>
          </div>
        </div>
        <MenuBar />
      </div>
    </div>
  );
};

export default Main;
