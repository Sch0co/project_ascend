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

const CharacterSet = (props) => {
    const [sell, setSell] = useState(false);
    const [onSell, setOnSell] = useState(false);
    const [item, setItem] = useState([]);
    const [userData, setUserData] = useState(null);
    const [equiment, setEquiment] = useState([]);

    const loadEquiment = async() => {
        const res = await axios({
            method: 'get',
            url: '/equipment',
        });
        console.log(res)
        if(res.status === 200) {
            setEquiment(res.data);
        }
    }

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: '/user',
        });
        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    const loadInvenData = async() => {
        const res = await axios({
            method: 'get',
            url: '/inventory/item',
        });
        if(res.status === 200) {
            setItem(res.data);
        }
    }

    useEffect(() => {
        loadUserData();
        loadInvenData();
        loadEquiment();
    }, [])

    const releaseEquiment = async(v) => {
        const res = await axios({
            method: 'delete',
            url: '/equipment',
            data: {
                inventoryItemIdx: v.inventoryItemIdx
            }
        });
        if(res.status === 200) {
            loadUserData();
            loadInvenData();
            loadEquiment();
            props.onEquiment?.();
        }
    }


    const itemCheck = async(v, index) => {
        // 판매모드가 아닐경우
        if(!sell)
        {
            console.log(v.inventoryItemIdx)
            const res = await axios({
                method: 'post',
                url: '/equipment',
                data: {
                    inventoryItemIdx: v.inventoryItemIdx
                }
            });
            if(res.status === 200) {
                loadUserData();
                loadInvenData();
                loadEquiment();
                props.onEquiment?.();
            }
        }
        else
        {
            let copyData = [...item];
            copyData[index] = {
                ...copyData[index],
                isChecked: !copyData[index].isChecked,
            }
            setItem(copyData);
        }
    }

    const sellItem = async() => {
        let iCheck = item.filter((item) => (item.isChecked));
        if(iCheck?.length <= 0)
        {
            return;
        }
        iCheck = iCheck.map((item) => item.inventoryItemIdx);
        const res = await axios({
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdx: iCheck
            }
        });

        console.log(item.filter((item) => (item.isChecked)), iCheck, res, "<==결과", {
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdx: iCheck
            }
        })
        if(res.status === 200) {
            loadInvenData();
            notification.open({
                message: '판매',
                description:
                    '아이템이 판매 되었습니다.',
            });
        }
    }

    const onSellModeChnage = () => {
        setSell(!sell);
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
                                {
                                    equiment.filter((v) => v.itemType == "HELMET").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "HELMET" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    {v.description}
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "cover",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#9D06EC"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        헬멧
                                    </div>
                                }
                                {
                                    equiment.filter((v) => v.itemType == "ARMOR").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "ARMOR" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    {v.description}
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "cover",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#9D06EC"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        갑옷
                                    </div>
                                }
                                {
                                    equiment.filter((v) => v.itemType == "WEAPON").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "WEAPON" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    {v.description}
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "cover",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#9D06EC"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        무기
                                    </div>
                                }
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
                            <div style={{ position: "relative", display: "inline-block" }}>
                                <Tooltip
                                    placement="right"
                                    color="rgba(0, 0, 0, 0.7)"
                                    title={() => 
                                        <div
                                            style={{
                                                display: "block"
                                            }}
                                        >
                                            <h3 style={{ color: "#FFF" }}>{item.name}</h3>
                                            {item.description}
                                        </div>
                                    }
                                >
                                    <div
                                        className="invenItem"
                                        onClick={() => itemCheck(item, index)}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={item.itemUrl}
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: -5,
                                                    right: 0,
                                                    zIndex: 1,
                                                    fontSize: 30,
                                                    fontWeight: "bold",
                                                    color: 
                                                    item.itemRank == "S" ? "#9D06EC"
                                                    : item.itemRank == "A" ? "#EC5C5C"
                                                    : item.itemRank == "B" ? "#00DEFF"
                                                    : "#FFF",
                                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                    width: 30,
                                                    height: 45,
                                                    borderBottomLeftRadius: 10,
                                                }}
                                            >
                                                {item.itemRank}
                                            </div>
                                        </div>
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
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterSet;