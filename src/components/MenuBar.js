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
        width: "400px",
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
        maxWidth: "700px",
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
        maxWidth: "900px",
        margin: "0 auto",
    }
}

const MenuBar = () => {
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

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: '/user',
        });
        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const userDelete = async() => {
        const res = await axios({
            method: 'delete',
            url: '/user',
        });

        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    const onGacha = async(count = 1) => {
        const res = await axios({
            method: 'post',
            url: '/draw',
            data: {
                count,
            }
        });

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
                '도망치셨네요 겁쟁이처럼',
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
                <CharacterSet />
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
                            {userData?.money}
                        </div>
                        { itemResult.length > 0 ?
                            <div className="gachaInven">
                                <div className="gachaList">
                                    {itemResult.map((item) =>
                                        <div className="gachaItem">
                                            <img
                                                src={item.url}
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
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
                                        뽑기볼 이미지
                                    </div>
                                    <div className="gacha_1s">
                                        <Tooltip placement="bottom" color="#858cec" title="100원이 소모됩니다.">
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
                                        뽑기볼 이미지 * 10
                                    </div>
                                    <div className="gacha_10s">
                                        <Tooltip placement="bottom" color="#858cec" title="1,000원이 소모됩니다.">
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
                                            style={{
                                                outline: "none",
                                                border: "1px solid #D5D0DB",
                                                padding: 5,
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="pwChange"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        비밀번호 변경
                                    </div>
                                    <div
                                        className="nickChange"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        닉네임 변경
                                    </div>
                                    <div
                                        className="userDelete"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        회원 탈퇴
                                    </div>
                                </div>
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
                            <button className="logoutBtn" onClick={onLogout}>
                                로그아웃
                            </button>
                        </div>
                        { location.pathname !== "/main" &&
                            <div
                                className="exit"
                                onClick={onRunModal}
                            >
                                도망가기
                                <Modal title="안내" visible={isRunModal} onOk={onRun} onCansel={onRunModalCancel}>
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