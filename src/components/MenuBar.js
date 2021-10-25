import { React, useState } from "react";
import "./MenuBar.css";
import { ReactComponent as Exit } from "../icon/mainIcon/arrow-right-solid.svg";

const MenuBar = () => {
    const [sideToggle, setSideToggle] = useState(true);

    const showBar = () => {
        setSideToggle(!sideToggle);
    }

    return (
        <>
            { sideToggle && (
                <div className="sideBarMenu">
                    <div className="sideBarTop">
                        <div className="sideBarMenuName">MENU</div>
                        <button
                            className="sideBarExit"
                            onClick={showBar}
                        >
                            <Exit width="15" height="15"/>
                        </button>
                    </div>
                    <div className="sideBarList">
                        <div>
                            <button>
                                마이페이지
                            </button>
                        </div>
                        <div>
                            <button>
                                캐릭터 세팅
                            </button>
                        </div>
                        <div>
                            <button>
                                상점
                            </button>
                        </div>
                        <div>
                            <button>
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MenuBar;