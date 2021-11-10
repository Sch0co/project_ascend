import React, { useEffect, useState } from "react";
import "./CharaStatus.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";

const CharaStatus = (props) => {
    const userData = props.userData;

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
                        골드
                    </div>
                    <div>{userData?.money?.toLocaleString()}</div>
                </div>
                {/* <div>캐릭터 생성 날짜</div> */}
            </div>
    )
}

export default CharaStatus;