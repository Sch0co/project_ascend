import React, { useState, useEffect } from "react";
import "./CharacterSet.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
import { ReactComponent as Check } from "../icon/mainIcon/check.svg";
import { ReactComponent as NoCheck } from "../icon/mainIcon/nocheck.svg";
// import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close_cross_delete_icon.svg";
import { Tooltip, notification } from 'antd';
import axios from "axios";
import {API_URL} from "../common/util";

const CharacterSet = () => {
    const [sell, setSell] = useState(false);
    const [onSell, setOnSell] = useState(false);
    const [item, setItem] = useState([]);
    const [userData, setUserData] = useState(null);

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: `${API_URL}/user`,
        });

        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    const loadInvenData = async() => {
        const res = await axios({
            method: 'get',
            url: `${API_URL}/inventory/item`,
        });
        if(res.status === 200) {
            setItem(res.data);
        }
    }

    useEffect(() => {
        loadUserData();
        loadInvenData();
    }, [])


    const itemCheck = (index) => {
        if(!sell) return;
        let copyData = [...item];
        copyData[index] = {
            ...copyData[index],
            isChecked: !copyData[index].isChecked,
        }
        setItem(copyData);
    }

    const sellItem = async() => {
        // console.log("판매시작", item)
        // let iCheck = item.filter((item) => (item.isChecked));
        // iCheck = iCheck.map((item) => item.idx);
        // console.log(iCheck)
        // const res = await axios({
        //     method: 'get',
        //     url: `${API_URL}/inventory/item`,
        //     data: {
        //         userIdx: 2,
        //         inventoryItemIdx: 9
        //     }
        // });

        // if(res.status === 200) {
        //     // setItem(res.data);
        // }

        // setItem(iCheck);
        sellNoti();
    }

    const onSellModeChnage = () => {
        setSell(!sell);
        setOnSell(!onSell);
    }

    const sellNoti = () => {
        notification.open({
          message: '판매',
          description:
            '아이템이 판매 되었습니다.',
        });
      };

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
                                <div>{userData?.nickname}</div>
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
                                <div>{userData?.hp?.toLocaleString()}</div>
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
                                <div>{userData?.defense?.toLocaleString()}</div>
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
                                <div>{userData?.damage?.toLocaleString()}</div>
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
                                <div>{userData?.money?.toLocaleString()}</div>
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
                                onClick={onSellModeChnage}
                            >
                                    판매 모드
                            </div>
                            </Tooltip>
                        </div>
                        { onSell && 
                            <button
                                className="sellBtn"
                                onClick={sellItem}
                            >
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
                                { sell &&
                                    <div className="checkBox">
                                        {
                                            item.isChecked ?
                                                <Check />
                                                :
                                                <NoCheck />
                                        }
                                    </div>
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