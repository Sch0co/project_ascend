import React, { useEffect, useState  } from "react";
import "./index.css";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as Armor } from "../../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../../icon/mainIcon/coins.svg";
// import { ReactComponent as Exit } from "../../icon/mainIcon/exit-door.svg";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { animated, useSpring } from 'react-spring';
import { notification } from 'antd';

const Index = () => {
    const [monsterData, setMonsterData] = useState(null);
    const [userData, setUserData] = useState(null);

    const [hp, setHp] = useState(null);
    const [totalHp, setTotalHp] = useState(null);
    const [hpPercent, setHpPercent] = useState("100%");
    const [monsterHp, setMonsterHp] = useState(50);
    const [monsterTotalHp, setMonsterTotalHp] = useState(50);
    const [monsterHpPercent, setMonsterHpPercent] = useState("100%");

    const [isDefeat, setIsDefeat] = useState(false);
    const [isVictory, setIsVitory] = useState(false);

    const { stageIndex } = useParams();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false); // 데이터 호출 확인

    const loadStageInfo = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: `/stage/${stageIndex}`,
            });
            if(res.status === 200) {
                setMonsterHp(res.data.monsterHp);
                setMonsterTotalHp(res.data.monsterHp);
                setMonsterData(res.data);
            }
        } catch {
            history.push("/main");
        }
    }

    const loadUserData = async() => {
        try {
            const res = await axios({
                method: 'get',
                url: '/user',
            });
            if(res.status === 200) {
                setUserData(res.data);
                setTotalHp(res.data.hp);
                setHp(res.data.hp);
            }

        } catch {
            history.push("/main");
        }
    }

    const loadData = async() => {
        setIsLoaded(false);
        await loadStageInfo();
        await loadUserData();
        setIsLoaded(true);
    }

    useEffect(() => {
        const monsterDamageInterval = setInterval(() => {
            let copyLoaded = false;
            let copyMonsterData = null;
            let copyUserData = null;
            let copyTotalHp = null;
            setUserData((prevState) => {
                copyUserData = prevState;
                return prevState;
            });
            setTotalHp((prevState) => {
                copyTotalHp = prevState;
                return prevState;
            });
            setIsLoaded((prevState) => {
                copyLoaded = prevState;
                return prevState;
            });
            setMonsterData((prevState) => {
                copyMonsterData = prevState;
                return prevState;
            });
            if(copyLoaded && copyMonsterData)
            {
                setHp((prevState) => {
                    if(prevState - copyMonsterData?.monsterDamage < 0)
                    {
                        return 0;
                    }
                    else
                    {
                        let damage = copyMonsterData?.monsterDamage - copyUserData?.defense;
                        if(damage <= 0) {
                            damage = 0;
                        }
                        setHpPercent(`${(prevState - damage) / copyTotalHp * 100}%`);
                        return prevState - damage;
                    }
                });
            }
        }, 1000)

        if(!isVictory && !isDefeat)
        {
            loadData();
        }

        if(isVictory || isDefeat)
        {
            clearInterval(monsterDamageInterval);
        }

        return () => {
            clearInterval(monsterDamageInterval);
        }
    }, [isVictory, isDefeat])

    useEffect(() => {
        if(hp != null && hp <= 0)
        {
            setIsDefeat(true);
            setHpPercent("0%");
        }
    }, [hp])

    useEffect(async() => {
        if(monsterHp <= 0)
        {
            setIsVitory(true);
            setMonsterHpPercent("0%");
            await axios({
                method: 'post',
                url: '/mystage/clear',
                data: {
                    stageIdx: stageIndex
                }
            });
        }
    }, [monsterHp])

    const onAttack = () => {
        if(isDefeat || isVictory || !isLoaded) return;
        setMonsterHp(prevState => {
            if(prevState - userData.damage < 0)
            {
                return 0;
            }
            else
            {
                setMonsterHpPercent(`${(prevState - userData.damage) / monsterTotalHp * 100}%`);
                return prevState - userData.damage;
            }
        });
        monsterEffectApi.start({
            config: {
                duration: 100
            },
            from: {
                transform: "translate3d(-50px, 0, 0)"
            },
            to: [
                {transform: "translate3d(30px, 0, 0)"},
                {transform: "translate3d(10px, 0, 0)"},
                {transform: "translate3d(-10px, 0, 0)"},
                {transform: "translate3d(0px, 0, 0)"},
            ],
        });
    }

    const DefeatView = () => {
        return (
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#FFF",
                    fontSize: 50
                }}
            >
                패배!
                <div className="button" onClick={() => history.push("/main")}>
                    돌아가기
                </div>
            </div>
        )
    }

    const VictoryView = () => {
        notification.open({
            style: {
                width: 250,
            },
            message: '안내',
            description:
                `${monsterData?.dropMoney?.toLocaleString()}골드를 획득했습니다.`,
        })
        return (
            <div
                style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#FFF",
                    fontSize: 50
                }}
            >
                승리!
                <div
                    className="button"
                    onClick={() => history.push("/main")}
                >
                    돌아가기
                </div>
            </div>
        )
    }

    const monsterHpSpring = useSpring({ width: monsterHpPercent });
    const userHpSpring = useSpring({ width: hpPercent });
    const [monsterEffect, monsterEffectApi] = useSpring(() => ({}));

    return (
        <div className="gameMain">
            {
                isDefeat && <DefeatView />
            }
            {
                isVictory && <VictoryView />
            }
            <MenuBar />
            <div className="monInfo">
                <div className="monStats">
                    {monsterData?.isBoss === "Y" ?
                        <div className="monName">
                            [ BOSS ] {monsterData?.monsterName}
                        </div>
                    :
                        <div className="monName">{monsterData?.monsterName}</div>
                    }
                    <div className="monHp">
                        <p
                            style={{
                                position: "absolute",
                                color: "#000",
                                zIndex: 1
                            }}
                        >
                            {monsterHp?.toLocaleString()} / {monsterTotalHp?.toLocaleString()}
                        </p>
                        <animated.div
                            style={{
                                position: "absolute",
                                left: 0,
                                width: monsterHpSpring.width,
                                height: "100%",
                                backgroundColor: "#f17979",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            textAlign: "right",
                            fontWeight: "bold",
                        }}
                    >
                        데미지 {monsterData?.monsterDamage?.toLocaleString()}
                    </div>
                </div>
                <animated.div
                    className="monImg"
                    onClick={onAttack}
                    style={{...monsterEffect}}
                >
                    <img
                        src={monsterData?.monsterUrl}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </animated.div>
            </div>
            <div className="userInter">
                <div className="userInfo">
                    <div className="userPro">
                        <div className="userImg">
                            <img
                                src="../../profile.png"
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                        <div className="userNick">{userData?.nickname}</div>
                    </div>
                    <div className="userStats">
                        <div
                            className="userHp"
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    color: "#000",
                                    fontSize: 20,
                                    zIndex: 1,
                                }}
                            >
                                {hp?.toLocaleString()} / {totalHp?.toLocaleString()}
                            </div>
                            <animated.div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: 40,
                                    width: userHpSpring.width,
                                    backgroundColor: "#f17979",
                                    borderRadius: 5,
                                }}
                            />
                        </div>
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
                                <div className="statNum">{userData?.damage?.toLocaleString()}</div>
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
                                <div className="statNum">{userData?.defense?.toLocaleString()}</div>
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
                                    골드
                                </div>
                                <div className="statNum">{userData?.money?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;