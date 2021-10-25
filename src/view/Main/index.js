import React from "react";
import "./index.css";
import { Modal} from "antd";
import MenuBar from "../../components/MenuBar";
import { ReactComponent as Line } from "../../icon/mainIcon/bars-solid.svg";
const Main = () => {
  return (
    <div className="mainWindow">
      <div className="mainTop">
        Ascend
      <Line width="30" height="25" />
      </div>
      <MenuBar />
      <div className="mainForm">
        <div className="mainStart">
          <div className="gameName">Ascend</div>
          <div className="startButton">
            <button className="startBtn">모험 출발</button>
          </div>
        </div>
        {/* <div className="mainSide">
          <div className="gearStatus">
            <div className="gear">
              <div className="gear_1">
                <div>투구</div>
                <div>갑옷</div>
              </div>
              <div className="gear_2">
                <div>장갑</div>
                <div>신발</div>
              </div>
              <div className="gear_3">
                <div>무기</div>
              </div>
            </div>
            <div className="userStatus">
              <div className="statusSt">
                체력 100
              </div>
              <div className="statusDe">
                방어력 0
              </div>
              <div className="statusCriDa">
                크리티컬 데미지 150%
              </div>
              <div className="statusCriPro">
                크리티컬 확률 10%
              </div>
              <div className="statusDa">
                기본 데미지 10
              </div>
              <div className="statusMoney">
                재화 0원
              </div>
              <div className="statusStage">
                현재 ?층
              </div>
            </div>
          </div>
          <div className="shopButton">
            <button className="shopBtn">상점</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Main;
