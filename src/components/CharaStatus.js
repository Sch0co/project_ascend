import React from "react";
import "./CharaStatus.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";

const CharaStatus = () => {
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
                    <div>닉네임</div>
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
                    <div>100</div>
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
                    <div>0</div>
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
                    <div>10</div>
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
                    <div>0</div>
                </div>
                {/* <div>캐릭터 생성 날짜</div> */}
            </div>
    )
}

export default CharaStatus;