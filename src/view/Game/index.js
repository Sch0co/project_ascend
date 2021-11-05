import React, { useEffect, useState } from "react";
// import { useSpring, animated } from "react-spring";
import "./index.css";
import { useParams } from "react-router-dom";
import { ReactComponent as Armor } from "../../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../../icon/mainIcon/coins.svg";
// import { ReactComponent as Exit } from "../../icon/mainIcon/exit-door.svg";
import MenuBar from "../../components/MenuBar";
import axios from "axios";

const Index = (props) => {
    const [monData, setMonData] = useState(null);
    const [userData, setUserData] = useState(null);

    const { stageIndex } = useParams();
    // const history = useHistory();

    // const onRun = () => {
    //     history.push("/main");
    // }

    const loadStageInfo = async() => {

        const res = await axios({
            method: 'get',
            url: `/stage/${stageIndex}`,
        });

        if(res.status === 200) {
            setMonData(res.data);
        }

    }

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: "/user",
        });

        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    useEffect(() => {
        loadStageInfo();
        loadUserData();
    }, [])


    return (
        <div className="gameMain">
            <MenuBar />
            <div className="monInfo">
                <div className="monStats">
                    <div className="monName">{monData?.monsterName}</div>
                    <div className="monHp">
                        HP {monData?.monsterHp?.toLocaleString()}
                    </div>
                </div>
                <div className="monImg">
                    {monData?.monsterUrl?.toLocaleString()}
                </div>
            </div>
            <div className="userInter">
                <div className="userInfo">
                    <div className="userPro">
                        <div className="userImg">{userData?.userProfileUrl}</div>
                        <div className="userNick">{userData?.nickname}</div>
                    </div>
                    <div className="userStats">
                        <div className="userHp">HP {userData?.hp?.toLocaleString()}</div>
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
                                <div>{userData?.damage?.toLocaleString()}</div>
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
                                <div>{userData?.defense?.toLocaleString()}</div>
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
                                <div>{userData?.money?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="userRun">
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
                </div> */}
            </div>
        </div>
    )
}

export default Index;