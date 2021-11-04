import React, { useState } from "react";
import "./CharacterSet.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
// import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close_cross_delete_icon.svg";
import { Tooltip, notification } from 'antd';
import { useSpring, animated } from 'react-spring';

const dataB = [
    {
        name: "무기",
        url: "./item1.png",
    },
    {
        name: "갑옷",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
]

const CharacterSet = () => {
    const [sell, setSell] = useState(true);
    const [onSell, setOnSell] = useState(false);
    const [item, setItem] = useState(dataB);

    const itemCheck = (index) => {
        let copyData = [...item];
        copyData[index] = {
            ...copyData[index],
            isChecked: !copyData[index].isChecked,
        }
        setItem(copyData);
    }

    const {x} = useSpring({
        from: {x: 0},
        x: sell ? 1 : 0,
        config: {duration: 700},
    })

    const sellBt = () => {
        setOnSell(!onSell);
    }

    return (
        <div className="characterModal">
            <div className="characterSetTop">
                <div>캐릭터 세팅</div>
                {/* <ModalClose
                    onClick={characterClose}
                    style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                    }}
                /> */}
            </div>
            <div className="characterSetList">
                <div className="charaSta">
                    <div className="charaGear">
                        <div className="gearTop">
                            캐릭터 장비
                        </div>
                        <div className="gearTab">
                            <div className="gear">
                                <div>
                                    투구
                                </div>
                                <div>
                                    갑옷
                                </div>
                                <div>
                                    무기
                                </div>
                            </div>
                            <div className="charaImg">
                                캐릭터 이미지
                            </div>
                        </div>
                    </div>
                    <div className="charaStatus">
                        <div className="statusTop">
                            캐릭터 스탯
                        </div>
                        <div className="status">
                            <div className="stats">
                                <div>
                                    <User
                                        width="16px"
                                        height="16px" 
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    이름
                                </div>
                                <div>닉네임</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Hp
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}  
                                    />
                                    체력
                                </div>
                                <div>100</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Armor
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    방어력
                                </div>
                                <div>0</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Damage
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    데미지
                                </div>
                                <div>10</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Coin
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    재화
                                </div>
                                <div>0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventory">
                    <div className="invenTop">
                        <div className="invenMode">
                            <div className="invenName">인벤토리</div>
                            <Tooltip placement="right" color="#858cec" title="아이템을 선택하여 판매할 수 있습니다.">
                            <div
                                className="sellMode"
                                onClick={() => {
                                    setSell(!sell);
                                    sellBt();
                                    const a = item.filter((item) => (!item.isChecked));
                                    setItem(a);
                                }}
                            >
                                <animated.div
                                    style={{
                                        opacity: x.to({ range: [0, 1], output: [0.5, 1] }),
                                        cursor: "pointer",
                                        border: "2px solid #221f47",
                                        padding: 5,
                                        borderRadius: "5px",
                                    }}
                                >
                                    판매 모드
                                </animated.div>
                            </div>
                            </Tooltip>
                        </div>
                        { onSell && 
                            <button className="sellBtn">
                                판매
                            </button>
                        }
                    </div>
                    <div className="invenArray">
                        {item.map((item, index) => (
                            <div
                                className="invenItem"
                                onClick={() => itemCheck(index)}
                            >
                                <p>{item.name}</p>
                                {
                                    item.isChecked ? "체크" : "체크 안됨"
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterSet;