import { React, useState } from "react";
import "./MenuBar.css";
import { ReactComponent as Close } from "../icon/mainIcon/arrow-right-solid.svg";
import { ReactComponent as Line } from "../icon/mainIcon/bars-solid.svg";
import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close_cross_delete_icon.svg";
import { useMediaQuery } from "react-responsive"
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

const modalStyle = {
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
                            style={modalStyle}
                        >
                            <div className="myPageTop">
                                <div>마이페이지</div>
                                <ModalClose onClick={myPageClose} />
                            </div>
                            <div className="myPageList">
                                <div>프로필 이미지 변경</div>
                                <div>닉네임 변경</div>
                                <div>비밀번호 변경</div>
                                <div>회원 탈퇴</div>
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
                                style={modalStyle}
                            >
                                캐릭터 세팅
                                <ModalClose onClick={characterClose} />
                            </Modal>
                        <div>
                            <button onClick={shopOpen}>
                                상점
                            </button>
                        </div>
                            <Modal
                                isOpen={isShop}
                                onRequestClose={shopClose}
                                style={modalStyle}
                            >
                                상점
                            <ModalClose onClick={shopClose} />
                            </Modal>
                        <div>
                            <button onClick={onLogout}>
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