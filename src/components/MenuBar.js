import { React, useState } from "react";
import "./MenuBar.css";
import { ReactComponent as Close } from "../icon/mainIcon/arrow-right-solid.svg";
import { ReactComponent as Line } from "../icon/mainIcon/bars-solid.svg";
import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close_cross_delete_icon.svg";
import { useMediaQuery } from "react-responsive"
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

// modal style
const myPageStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        backgroundColor: "#fff",
        width: "400px",
    }
}

const characterStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        backgroundColor: "#fff",
    }
}

const shopStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        backgroundColor: "#fff",
    }
}

const MenuBar = () => {
    const [sideToggle, setSideToggle] = useState(true);
    const [isMyPage, setIsMyPage] = useState(false);
    const [isCharacter, setIsCharacter] = useState(false);
    const [isShop, setIsShop] = useState(false);

    const screenMove = useMediaQuery({
        query: "(max-width: 600px)",
    })

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
    
    const characterOpen = () => {
        setIsCharacter(true);
    }

    const characterClose = () => {
        setIsCharacter(false);
    }
    const shopOpen = () => {
        setIsShop(true);
    }

    const shopClose = () => {
        setIsShop(false);
    }

    // logout
    const history = useHistory();

    const onLogout = () => {
        history.push("/");
    }

    return (
        <>
            { sideToggle || !screenMove ? (
                <div className="sideBarMenu">
                    <div className="sideBarTop">
                        { screenMove &&
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
                                    <div>프로필 이미지 변경</div>
                                    <div>닉네임 변경</div>
                                    <div>비밀번호 변경</div>
                                    <div>회원 탈퇴</div>
                                </div>
                            </div>
                        </Modal>
                        <div>
                            <button onClick={characterOpen}>
                                캐릭터 세팅
                            </button>
                        </div>
                            <Modal
                                isOpen={isCharacter}
                                onRequestClose={characterClose}
                                style={characterStyle}
                            >
                                <div className="characterModal">
                                    <div className="characterSetTop">
                                        <div>캐릭터 세팅</div>
                                        <ModalClose onClick={characterClose} />
                                    </div>
                                    <div className="characterSetList">
                                        <div>
                                            캐릭터 장비창
                                        </div>
                                        <div>
                                            캐릭터 스탯
                                        </div>
                                        <div>
                                            인벤토리
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        <div>
                            <button onClick={shopOpen}>
                                상점
                            </button>
                        </div>
                            <Modal
                                isOpen={isShop}
                                onRequestClose={shopClose}
                                style={shopStyle}
                            >
                                <div className="shopModal">
                                    <div className="shopTop">
                                        <div>상점</div>
                                        <ModalClose onClick={shopClose} />
                                    </div>
                                    <div className="shopList">
                                        <div className="gacha">
                                            <div>
                                                1회 뽑기
                                            </div>
                                            <div>
                                                10회 뽑기
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        <div className="logout">
                            <button className="logoutBtn" onClick={onLogout}>
                                로그아웃
                            </button>
                        </div>
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