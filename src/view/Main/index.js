import { React, useState } from "react";
import "./index.css";
import { Modal } from "antd";
import MenuBar from "../../components/MenuBar";
import { ReactComponent as Line } from "../../icon/mainIcon/bars-solid.svg";

const Main = () => {
  const [sideMenuToggle, setSideMenuToggle] = useState(true);

  const menuToggle = () => {
    setSideMenuToggle(!sideMenuToggle);
  }

  return (
    <div className="mainWindow">
      <div className="mainTop">
        Ascend
        <Line
          className="mainSide"
          width="30"
          height="25"
          onClick={menuToggle}  
        />
      </div>
      <div className="mainForm">
        <div className="mainStart">
          <div className="gameName">Ascend</div>
          <div className="startButton">
            <button className="startBtn">모험 출발</button>
          </div>
        </div>
        {
          sideMenuToggle && (<MenuBar />)
        }
      </div>
    </div>
  );
};

export default Main;
