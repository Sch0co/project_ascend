import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";
import "./index.css";
import { useHistory } from "react-router-dom";
import { ReactComponent as Armor } from "../../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../../icon/mainIcon/coins.svg";
import { ReactComponent as Exit } from "../../icon/mainIcon/exit-door.svg";

const Index = () => {
    const history = useHistory();

    const onRun = () => {
        history.push("/main");
    }

    return (
        <div className="gameMain">
            <div className="monInfo">
                <div className="monStats">
                    <div className="monName">몬스터 이름</div>
                    <div className="monHp">
                        HP <span>1,000</span>/1,000
                    </div>
                </div>
                <div className="monImg">
                    몬스터 이미지
                </div>
            </div>
            <div className="userInter">
                <div className="userInfo">
                    <div className="userPro">
                        <div className="userImg">유저 이미지</div>
                        <div className="userNick">유저 닉네임</div>
                    </div>
                    <div className="userStats">
                        <div className="userHp">HP <span>100</span>/100</div>
                        <div className="statsList">
                            <div className="stats">
                                <div className="statName">
                                    <Damage
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    데미지
                                </div>
                                <div>10</div>
                            </div>
                            <div className="stats">
                                <div className="statName">
                                    <Armor
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    방어력
                                </div>
                                <div>0</div>
                            </div>
                            <div className="stats">
                                <div className="statName">
                                    <Coin
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    재화
                                </div>
                                <div>0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userRun">
                    <Exit
                        onClick={onRun}
                        style={{
                            width: 90,
                            height: 90,
                            verticalAlign: "middle",
                            color: "#000",
                        }}
                    />
                    <div className="run">도망가기!</div>
                </div>
            </div>
        </div>
    )
}

export default Index;