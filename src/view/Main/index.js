import React from "react";
import "./index.css";

const Main = () => {
  return (
    <div className="mainWindow">
      <button className="mainMenu">메뉴</button>
      {/* 메뉴 클릭시 도움말, 게임종료, 인벤토리*/}
      <div className="nickname">닉네임 정보</div>
      <div className="main">
        <div className="startButton">
          <button>모험 출발</button>
        </div>
      </div>
      <div className="gearStatus">
        <div className="gear">
          <div>투구</div>
          {/* 각 무기별 인벤토리 */}
          <div>갑옷</div>
          <div>장갑</div>
          <div>신발</div>
          <div>무기</div>
          <div>펫</div>
        </div>
        <div className="status">
          체력 100 방어력 0 크리티컬 데미지 150% 크리티컬 확률 10% 기본 데미지
          10 재화 0원 현재 ?층
        </div>
      </div>
      <div className="shopButton">
        <button>상점</button>
      </div>
    </div>
  );
};

export default Main;
