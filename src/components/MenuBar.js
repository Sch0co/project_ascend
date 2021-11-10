import { React, useState, useEffect } from "react";
import "./MenuBar.css";
import { ReactComponent as Close } from "../icon/mainIcon/arrow-right-solid.svg";
import { ReactComponent as Line } from "../icon/mainIcon/bars-solid.svg";
import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
import { useMediaQuery } from "react-responsive"
import { useHistory, useLocation } from "react-router-dom";
import CharacterSet from "./CharacterSet";
import Gacha from "./Gacha";
import Modals from "react-modal";
import { Modal, Tooltip, notification } from 'antd';
import axios from "axios";

const myPageStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
    },
    content: {
        backgroundColor: "#fff",
        maxWidth: 400,
        maxHeight: 600,
        margin: "0 auto",
    }
}

const characterStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
    },
    content: {
        backgroundColor: "#fff",
        maxWidth: 700,
        margin: "0 auto",
    }
}

const shopStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2,
    },
    content: {
        backgroundColor: "#fff",
        maxWidth: 900,
        maxHeight: 700,
        margin: "auto auto",
    }
}

const MenuBar = (props) => {
    const screenMove = useMediaQuery({
        query: "(max-width: 600px)",
    })

    const location = useLocation();
    const [sideToggle, setSideToggle] = useState((!screenMove && location.pathname == "/main") ? true : false);
    const [isMyPage, setIsMyPage] = useState(false);
    const [isCharacter, setIsCharacter] = useState(false);
    const [isShop, setIsShop] = useState(false);
    const [itemResult, setItemResult] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isRunModal, setIsRunModal] = useState(false);
    const [isLogoutModal, setIsLogoutModal] = useState(false);
    const [isUserDeleteModal, setIsUserDeleteModal] = useState(false);
    const [userDataChangeMode, setUserDataChangeMode] = useState(false);
    const [changeNick, setChangeNick] = useState("");
    const [changeNickCopy, setChangeNickCopy] = useState(""); // 닉네임 초기값 확인용
    const [userPwd, setUserPwd] = useState("");
    const [changePwd, setChangePwd] = useState("");
    const [checkPwd, setCheckPwd] = useState("");
    const [nickChecked, setNickChecked] = useState(false);

    const loadUserData = async() => {
        try {
            const res = await axios({
                method: 'get',
                url: '/user',
            });
            if(res.status === 200) {
                setUserData(res.data);
                setChangeNick(res.data.nickname);
                setChangeNickCopy(res.data.nickname);
            }

        } catch {
            history.push("/");
        }

    }

    useEffect(() => {
        loadUserData();
    }, [])

    const onUserDeletetModal = () => {
        setIsUserDeleteModal(true);
    }

    const onUserDeletetModalCancel = () => {
        setIsUserDeleteModal(false);
    }

    const userDataChange = async() => {
        if(userPwd === "")
        {
            notification.open({
                message: '경고',
                description: '기존 비밀번호를 입력해 주세요.',
            });
            return;
        } 
        if(changeNick.length < 2)
        {
            notification.open({
                message: '경고',
                description: '닉네임은 최소 2글자 입니다.',
            });
            return;
        }

        try {
            if(changeNickCopy != changeNick) {
                setNickChecked(true);
            };

            const resp = await axios({
                method: 'post',
                url: '/user/valid/nickname',
                data: {
                    "nickname" : changeNick,
                }
            });
            if(resp.status === 200)
            {
                setNickChecked(resp.data);
                if(!resp.data)
                {
                    notification.open({
                        message: '경고',
                        description: '닉네임이 중복되었습니다.',
                    });        
                }
            }
            else
            {
                setNickChecked(false);
            }
        } catch {
            setNickChecked(false);

            notification.open({
                message: '경고',
                description: '닉네임이 중복되었습니다.',
            });
            return;
        }

        const res = await axios({
            method: 'put',
            url: '/user',
            data: {
                "nickname" : changeNick,
                "existPwd" : userPwd,
                "newPwd" : changePwd != "" && changePwd,
                "confPwd" : checkPwd != "" && checkPwd,
            }
        });

        
        if(res.status === 400)
        {
            notification.open({
                message: '경고',
                description: '비밀번호를 확인해 주세요.',
            });
            return;
        }

        setUserDataChangeMode(false);
        loadUserData();
        props.onUpdateUserData?.();
    }

    const userDelete = async() => {
        const res = await axios({
            method: 'delete',
            url: '/user',
        });

        if(res.status === 200) {
            history.push("/");
        }
        setIsUserDeleteModal(false);
    }

    const onGacha = async(count = 1) => {
        if(userData.money < count * 1000)
        {
            notification.open({
                style: {
                    width: 250,
                },
                message: '안내',
                description:
                    `${(count * 1000) - userData.money} 골드 부족합니다`,
            });
        }
        const res = await axios({
            method: 'post',
            url: '/draw',
            data: {
                count,
            }
        });
        if(res.status === 200)
        {
            setItemResult(res.data);
            loadUserData();
        }
    }

    // modal open/ close
    const showBar = () => {
        setSideToggle(!sideToggle);
    }

    const myPageOpen = () => {
        setIsMyPage(true);
    }

    const myPageClose = () => {
        setIsMyPage(false);
        setUserDataChangeMode(false);
    }
    
    // madal open/close
    const characterOpen = () => {
        setIsCharacter(true);
        // setSideToggle(false);
    }

    const characterClose = () => {
        setIsCharacter(false);
    }

    const shopOpen = () => {
        setIsShop(true);
        // setSideToggle(false);
    }

    const shopClose = () => {
        setIsShop(false);
        setItemResult([]);
    }

    const onLogoutModal = () => {
        setIsLogoutModal(true);
    }

    const onLogoutModalCancel = () => {
        setIsLogoutModal(false);
    }

    // logout
    const history = useHistory();

    const onLogout = async() => {
        const res = await axios({
            method: 'post',
            url: '/logout',
          });

        history.push("/");

    }

    const onRunModal = () => {
        setIsRunModal(true);
    }

    const onRunModalCancel = () => {
        setIsRunModal(false);
    }

    const onRun = () => {
        notification.open({
            message: '안내',
            description:
                '도망치셨네요 겁쟁이..',
        });
        history.push("/main");
    }

    return (
        <>
            <Modals
                isOpen={isCharacter}
                onRequestClose={characterClose}
                style={characterStyle}
            >
                <CharacterSet
                    onEquiment={props.onUpdateUserData}
                />
            </Modals>

            <Modals
                isOpen={isShop}
                onRequestClose={shopClose}
                style={shopStyle}
            >
                <div className="shopModal">
                    <div className="shopTop">
                        <div>상점</div>
                        <ModalClose
                            onClick={shopClose}
                            style={{
                                width: "25px",
                                height: "25px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <div className="shopList">
                        <div className="shopUserCoin">
                            <Coin
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "5px",
                                    verticalAlign: "middle",
                                }}
                            />
                            {userData?.money?.toLocaleString()}
                        </div>
                        { itemResult.length > 0 ?
                            <div className="gachaInven">
                                <div className="gachaList">
                                    {itemResult.map((item) =>
                                        <div
                                            className="gachaItem"
                                            style={{
                                                position: "relative",
                                            }}
                                        >
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
                                                        <div>
                                                            체력 +{item.hp.toLocaleString()}
                                                        </div>
                                                        <div>
                                                            방어력 +{item.defense.toLocaleString()}
                                                        </div>
                                                        <div>
                                                            데미지 +{item.damage.toLocaleString()}
                                                        </div>
                                                        <div>
                                                            가격 {item.price.toLocaleString()}골드
                                                        </div>
                                                        <div
                                                        style={{
                                                                marginTop: 5,
                                                                borderTop: "1px solid #fff",
                                                                fontSize: 10,
                                                            }}
                                                        >

                                                            {item.description}
                                                        </div>
                                                    </div>
                                                    
                                                }
                                            >
                                                <img
                                                    src={item.itemUrl}
                                                    style={{
                                                        objectFit: "contain",
                                                        width: 150,
                                                        height: 150,
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        item.itemRank == "S" ? "#DED714"
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
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                                    <button
                                        className="oneMoreGacha"
                                        type="button"
                                        onClick={onGacha.bind(this, 1)}
                                    >
                                        1번 더 뽑기
                                    </button>
                                    <button
                                        className="tenMoreGacha"
                                        type="button"
                                        onClick={onGacha.bind(this, 10)}
                                    >
                                        10번 더 뽑기
                                    </button>
                                    <button
                                        className="gachaClose"
                                        type="button"
                                        onClick={() => {setItemResult([])}}
                                    >
                                        돌아가기
                                    </button>
                            </div>
                            :
                            <div className="gacha">
                                <div className="gacha_1">
                                    <div className="gacha_1_img">
                                        <img
                                            src="./randombox1.png"
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="gacha_1s">
                                        <Tooltip placement="bottom" color="#858cec" title="1,000원이 소모됩니다.">
                                            <button
                                                onClick={onGacha.bind(this, 1)}
                                            >
                                                장비 1회 뽑기
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="gacha_2">
                                    <div className="gacha_2_img">
                                        <img
                                            src="./randombox.png"
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="gacha_10s">
                                        <Tooltip placement="bottom" color="#858cec" title="10,000원이 소모됩니다.">
                                            <button
                                                onClick={onGacha.bind(this, 10)}
                                            >
                                                장비 10회 뽑기
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    <Gacha />
                </div>
            </Modals>
            { sideToggle  ? (
                <div className="sideBarMenu">
                    <div className="sideBarTop">
                        { (location.pathname !== "/main" || screenMove) &&
                            <button
                                className="sideBarClose"
                                onClick={showBar}
                            >
                                <Close width="15" height="15"/>
                            </button>
                        }
                    </div>
                    <div className="sideBarList">
                        <div className="myPage">
                            <button
                                onClick={myPageOpen}
                            >
                                마이페이지
                            </button>
                        </div>
                        <Modals
                            isOpen={isMyPage}
                            onRequestClose={myPageClose}
                            style={myPageStyle}
                            onClose
                        >
                            <div className="myPageModal">
                                <div className="myPageTop">
                                    <div>마이페이지</div>
                                    <ModalClose
                                        className="closeBtn"
                                        onClick={myPageClose}
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>

                                { userDataChangeMode && isMyPage
                                ?
                                    <div className="userDataChange">
                                        <div className="changeNickname">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                닉네임 변경
                                            </div>
                                            <input
                                                value={changeNick}
                                                type="text"
                                                name="userNickname"
                                                onChange={(e) => setChangeNick(e.target.value)}
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                            />
                                        </div>
                                        <div className="changePwd">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                기존 비밀번호
                                            </div>
                                            <input
                                                value={userPwd}
                                                type="password"
                                                name="userPwd"
                                                onChange={(e) => setUserPwd(e.target.value)}
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="changePwd">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                비밀번호 변경
                                            </div>
                                            <input
                                                value={changePwd}
                                                type="password"
                                                name="userPwd"
                                                onChange={(e) => setChangePwd(e.target.value)}
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                            />
                                        </div>
                                        <div className="changePwd">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                비밀번호 확인
                                            </div>
                                            <input
                                                value={checkPwd}
                                                type="password"
                                                name="userPwd"
                                                onChange={(e) => setCheckPwd(e.target.value)}
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                            />
                                        </div>
                                        <div
                                            onClick={() => {
                                                userDataChange()
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                marginBottom: 30,
                                            }}
                                        >
                                            확인
                                        </div>
                                        <div
                                            onClick={() => {
                                                setUserDataChangeMode(false)
                                            }}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            돌아가기
                                        </div>
                                    </div>
                                :
                                    <div className="myPageList">
                                        {/* <div className="myPageProfile">
                                            <input
                                                className="profile"
                                                type="file"
                                            />
                                        </div> */}
                                        {/* <div>프로필 이미지 변경</div> */}
                                        <div className="userNickname">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                닉네임
                                            </div>
                                            <input
                                                value={userData?.nickname}
                                                type="text"
                                                name="userNickname"
                                                readOnly
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                            />
                                        </div>
                                        <div className="userEmail">
                                            <div
                                                style={{
                                                    marginRight: 20,
                                                }}
                                            >
                                                이메일
                                            </div>
                                            <input
                                                value={userData?.email}
                                                type="email"
                                                name="userEmail"
                                                readOnly
                                                style={{
                                                    outline: "none",
                                                    border: "1px solid #D5D0DB",
                                                    padding: 5,
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="userChangeMode"
                                            onClick={() => {setUserDataChangeMode(true)}}
                                            style={{
                                                cursor: "pointer",
                                                marginBottom: 40,
                                            }}
                                        >
                                            회원 정보 수정
                                        </div>
                                        <div
                                            className="userDelete"
                                            onClick={onUserDeletetModal}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            회원 탈퇴
                                        </div>
                                        <Modal title="안내" visible={isUserDeleteModal} onOk={userDelete} onCancel={onUserDeletetModalCancel}>
                                            <p>정말 탈퇴하시겠습니까? 탈퇴한 뒤엔 복구할 수 없습니다.</p>
                                        </Modal>
                                    </div>
                                }
                            </div>
                        </Modals>
                        { location.pathname === "/main" &&
                            <div>
                                <button onClick={characterOpen}>
                                    캐릭터 세팅
                                </button>
                            </div>
                        }
                        <div>
                            <button onClick={shopOpen}>
                                상점
                            </button>
                        </div>
                        <div className="logout">
                            <button className="logoutBtn" onClick={onLogoutModal}>
                                로그아웃
                            </button>
                        </div>
                        <Modal title="안내" visible={isLogoutModal} onOk={onLogout} onCancel={onLogoutModalCancel}>
                            <p>로그아웃하시겠습니까?</p>
                        </Modal>
                        { location.pathname !== "/main" &&
                            <div
                                className="exit"
                                onClick={onRunModal}
                            >
                                도망가기
                                <Modal title="안내" visible={isRunModal} onOk={onRun} onCancel={onRunModalCancel}>
                                    <p>도망가시겠습니까?</p>
                                </Modal>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                    <div className="mainSide">
                        <Line
                            className="mainSideBtn"
                            width="30"
                            height="25"
                            style={{
                                color: "#FFF"
                            }}
                            onClick={showBar}
                        />
                    </div>
                )
            }
        </>
    )
}

export default MenuBar;