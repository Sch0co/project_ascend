import { React, useEffect, useState } from "react";
import "./index.css";
import { ReactComponent as ModalClose } from "../../icon/mainIcon/x_close.svg";
import MenuBar from "../../components/MenuBar";
import CharacterSet from "../../components/CharacterSet";
import CharaStatus from "../../components/CharaStatus";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import GameStage from "../../components/GameStage";
import axios from "axios";
import { notification } from "antd";


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

const stageStyle = {
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
  const [stage, setStage] = useState([]);
  const [stageModal, setStageModal] = useState(false);

  const characterOpen = () => {
    setIsCharacter(true);
  }
  
  const characterClose = () => {
    setIsCharacter(false);
  }
  
  const stageOpen = async() => {
    setStageModal(true);

    const res = await axios({
      method: 'get',
      url: "/mystage",
    });

    if(res.status === 200) {
      setStage(res.data);
    }

    console.log(res);
  }
  
  const stageClose = () => {
    setStageModal(false);
  }
  
  const history = useHistory();
  
  const onGame = (item, index) => {
    const isClear = stage.filter((v) => v.isCleared === "1");

    if(isClear.length === 0 || index === 0)
    {
      history.push(`/main/game/${stage[0].stageIdx}`);
    }
    else if(isClear.length > 0 || stage[index - 1].isCleared === "1")
    {
      history.push(`/main/game/${item.stageIdx}`);
    }
    else if(item.isCleared === '1')
    {
      history.push(`/main/game/${item.stageIdx}`);
    }
    else
    {
      notification.open({
        message: '경고',
        description: '비밀번호를 입력해 주세요.',
      });
    }
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
              <button 
                className="startBtn"
                onClick={stageOpen}
              >
                모험 출발
              </button>
            </div>
          </div>
        </div>
              <Modal
                isOpen={stageModal}
                onRequestClose={stageClose}
                style={stageStyle}
              >
                <div className="stageTop">
                  <div>스테이지</div>
                  <ModalClose
                    onClick={stageClose}
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                  {stage.map((item, index) => (
                    <div
                      onClick={() => onGame(item, index)}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <GameStage
                        data={item}
                      />
                    </div>
                  ))}
              </Modal>
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
