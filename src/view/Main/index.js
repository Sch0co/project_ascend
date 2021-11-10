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
      zIndex: 2,
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
      zIndex: 2,
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
  const [userData, setUserData] = useState(null);
  const [itemList, setItemList] = useState([]); // 최근획득장비

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
  }
  
  const stageClose = () => {
    setStageModal(false);
  }
  
  const loadUserData = async() => {
    try {
      const res = await axios({
          method: 'get',
          url: '/user',
      });
  
      if(res.status === 200) {
          setUserData(res.data);
      }

    } catch {
      history.push("/");
    }
  }

  // 최근 획득 장비리스트 호출
  const loadItemList = async() => {
    const res = await axios({
      method: 'get',
      url: '/inventory/item/get',
  });
    if(res.status === 200) {
      setItemList(res.data);
    }
  }

  useEffect(() => {
    loadUserData();
    loadItemList();
  }, [])

  const newItemSell = async(idx) => {
    const res = await axios({
      method: 'post',
      url: '/item/sell',
      data: {
        inventoryItemIdxList: [idx]
      }
    });

    if(res.status === 200) {
      loadUserData();
      loadItemList();
      notification.open({
        style: {
          width: 250,
        },
        message: '안내',
        description:
          '아이템이 판매 되었습니다.',
      });
    }
  }

  const history = useHistory();
  
  const onGame = (item, index) => {
    const isClear = stage.filter((v) => v.isCleared === "1");

    if(isClear.length === 0 || index === 0)
    {
      history.push(`/main/game/${stage[0].stageIdx}`);
    }
    else if(isClear.length > 0 && stage[index - 1].isCleared === "1")
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
        style: {
          width: 250,
        },
        message: '경고',
        description: '이전 단계를 클리어해주세요!',
      });
    }
  }

  return (
    <div className="mainWindow">
      <MenuBar
        onUpdateUserData={loadUserData}
      />
      <div className="mainView">
        <div className="mainInfo">
          <div className="mainInfoTop">
            <div className="mainInfoStatus">
              캐릭터 능력치
            </div>
            <CharaStatus userData={userData} />
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
              <CharacterSet
                onEquiment={loadUserData}
                onSellItem={loadUserData}
              />
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
                        isCleared={
                          index == 0 ? true :
                          stage[index - 1]?.isCleared == "1" ? true : false
                        }
                      />
                    </div>
                  ))}
              </Modal>
        <div className="mainItem">
          <div className="mainItemTop">
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              최근 획득 장비
            </div>
            <div
              style={{
                fontSize: 13,
              }}
            >
              ※ 최근 획득한 장비 20개가 노출됩니다.
            </div>
          </div>
          <div className="mainItemList">
            {itemList.map((v) => (
              <div className="itemInfo">
                <img
                  src={v.itemUrl}
                  style={{
                    objectFit: "contain",
                    width: 60,
                    height: 60,
                  }}
                />
                <div
                  style={{
                    width: 200,
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  {v.itemRank}
                </div>
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: 150,
                    textAlign: "center",
                  }}
                >{v.description}</div>
                <div
                  style={{
                    width: 30,
                    textAlign: "center",
                  }}
                >
                  {v?.price?.toLocaleString()}
                </div>
                <button
                  className={"button"}
                  onClick={() => newItemSell(v.inventoryItemIdx)}
                >
                  판매
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
