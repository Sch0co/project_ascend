import { React, useState } from "react";
import "./index.css";
import MenuBar from "../../components/MenuBar";
import CharacterSet from "../../components/CharacterSet";
import CharaStatus from "../../components/CharaStatus";
import Modal from "react-modal";

const characterStyle = {
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
      backgroundColor: "#fff",
      maxWidth: "700px",
      margin: "0 auto",
  }
}

const Main = () => {
  const [isCharacter, setIsCharacter] = useState(false);

  const characterOpen = () => {
    setIsCharacter(true);
  }

  const characterClose = () => {
    setIsCharacter(false);
  }

  return (
    <div className="mainWindow">
      <MenuBar />
      <div className="mainView">
        <div className="mainInfo">
          <div className="mainInfoTop">
            <div className="mainInfoStatus">
              캐릭터 스탯
            </div>
            <CharaStatus />
          </div>
          <div className="mainSetting">
            <div
              className="mainIngoStaSet"
              style={{
                marginRight: 20
              }}  
            >
              <button className="mainStaBtn" onClick={characterOpen}>
                캐릭터 세팅
              </button>
            </div>
            <Modal
              isOpen={isCharacter}
              onRequestClose={characterClose}
              style={characterStyle}
            >
              <CharacterSet />
            </Modal>
            <div className="mainStartBtn">
              <button className="startBtn">모험 출발</button>
            </div>
          </div>
        </div>
        <div className="mainItem">
          <div className="mainItemTop">최근 획득 장비</div>
          <div className="mainItemList">
            목록 ~~
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
