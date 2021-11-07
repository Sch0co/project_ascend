import React, { useEffect, useState } from "react";
import "./CharaStatus.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
import axios from "axios";

const CharaStatus = () => {
    const [userData, setUserData] = useState(null);

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: `/user`,
        });

        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    return(
            <div className="statusList">
                <div className="stats">
                    <div className="statusName">
                        <User
                            width="16px"
                            height="16px" 
                            style={{
                                marginRight: "5px",
                            }}
                        />
                        이름
                    </div>
                    <div>{userData?.nickname}</div>
                </div>
                <div className="stats">
                    <div className="statusName">
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
                    <div className="statusName">
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
                    <div className="statusName">
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
                    <div className="statusName">
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
                {/* <div>캐릭터 생성 날짜</div> */}
            </div>
    )
}

export default CharaStatus;