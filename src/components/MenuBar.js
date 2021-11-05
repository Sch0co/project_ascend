import { React, useState } from "react";
import "./MenuBar.css";
import { ReactComponent as Close } from "../icon/mainIcon/arrow-right-solid.svg";
import { ReactComponent as Line } from "../icon/mainIcon/bars-solid.svg";
import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
import { ReactComponent as Exit } from "../icon/mainIcon/exit-door.svg";
import { useMediaQuery } from "react-responsive"
import { useHistory, useLocation } from "react-router-dom";
import CharacterSet from "./CharacterSet";
import Gacha from "./Gacha";
import Modal from "react-modal";
import { Tooltip, notification } from 'antd';

const dataA = [
    {
        name: "투구",
        url: "./item1.png",
    },
]

const dataB = [
    {
        name: "무기",
        url: "./item1.png",
    },
    {
        name: "갑옷",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
    {
        name: "방어구",
        url: "./item1.png",
    },
]

// modal style
// const myPageStyle = {
//     overlay: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     content: {
//         backgroundColor: "#fff",
//         width: "400px",
//     }
// }

const characterStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    },
    content: {
        backgroundColor: "#fff",
        maxWidth: "900px",
        margin: "0 auto",
    }
}

const MenuBar = () => {
    const [sideToggle, setSideToggle] = useState(true);
    // const [isMyPage, setIsMyPage] = useState(false);
    const [isCharacter, setIsCharacter] = useState(false);
    const [isShop, setIsShop] = useState(false);
    const [itemResult, setItemResult] = useState([]);

    const location = useLocation();

    const oneGacha = () => {
        setItemResult(dataA);
    }

    const tenGacha = () => {
        setItemResult(dataB);
    }

    const screenMove = useMediaQuery({
        query: "(max-width: 600px)",
    })

    // modal open/ close
    const showBar = () => {
        setSideToggle(!sideToggle);
    }

    // const myPageOpen = () => {
    //     setIsMyPage(true);
    // }

    // const myPageClose = () => {
    //     setIsMyPage(false);
    // }
    
    // madal open/close
    const characterOpen = () => {
        setIsCharacter(true);
        setSideToggle(false);
    }

    const characterClose = () => {
        setIsCharacter(false);
    }

    const shopOpen = () => {
        setIsShop(true);
        setSideToggle(false);
    }

    const shopClose = () => {
        setIsShop(false);
        setItemResult([]);
    }

    // logout
    const history = useHistory();

    const onLogout = () => {
        // const res = await axios({
        //     method: 'get',     //put
        //     url: "/user",
        //     // headers: {'Authorization': 'Bearer'+token}, 
        //   });

        history.push("/");

    }

    const onRun = () => {
        history.push("/main");
    }

    return (
        <>
            <Modal
                isOpen={isCharacter}
                onRequestClose={characterClose}
                style={characterStyle}
                zIndex={1000}
            >
                <CharacterSet />
            </Modal>

            <Modal
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
                            1,000
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
                                                onClick={oneGacha}
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
                                                onClick={tenGacha}
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
            </Modal>
            { sideToggle  ? (
                <div className="sideBarMenu">
                    <div className="sideBarTop">
                        { location.pathname !== "/main" &&
                            <button
                                className="sideBarClose"
                                onClick={showBar}
                            >
                                <Close width="15" height="15"/>
                            </button>
                        }
                    </div>
                    <div className="sideBarList">
                        {/* <div className="myPage">
                            <button
                                onClick={myPageOpen}
                            >
                                마이페이지
                            </button>
                        </div>
                        <Modal
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
                                    />
                                </div>
                                <div className="myPageList">
                                    <div className="myPageProfile">
                                        <input
                                            className="profile"
                                            type="file"
                                            value={upload}
                                        />
                                    </div>
                                    <div>프로필 이미지 변경</div>
                                    <div>닉네임 변경</div>
                                    <div>비밀번호 변경</div>
                                    <div>회원 탈퇴</div>
                                </div>
                            </div>
                        </Modal> */}
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
                                onClick={onRun}
                            >
                                도망가기
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
                            onClick={showBar}
                        />
                    </div>
                )
            }
        </>
    )
}

export default MenuBar;