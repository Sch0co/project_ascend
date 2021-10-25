import React from "react";
import { useState } from "react/cjs/react.development";
import "./MenuBar.css";
import { ReactComponent as Exit } from "../icon/mainIcon/arrow-right-solid.svg";

const MenuBar = () => {
    const [toggle, setToggle] = useState(false);

    const showBar = () => {
        setToggle(!toggle);
    }

    return (
        <div className="sideBarMenu">
            <div className="sideBarTop">
                <div>MENU</div>
                <button className="sideBarExit"><Exit width="30" height="20"/></button>
            </div>
            <div className="sideBarList">
                <div>
                    마이페이지
                </div>
                <div>
                    캐릭터 세팅
                </div>
                <div>
                    상점
                </div>
                <div>
                    로그아웃
                </div>
            </div>
        </div>
    )
}

export default MenuBar;