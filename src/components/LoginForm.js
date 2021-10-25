import React, { useState } from "react";
import { Button, Tabs } from "antd";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const LoginForm = () => {
  // const [loginTab, setLoginTab] = useState(true);

  const history = useHistory();

  const onLogin = () => {
    history.push("/main");
  };

  return (
    <div className="login">
      {/* <div className="formTitle">
        {<Button
          onClick={() => {
            setLoginTab(true);
          }}
          style={{
            backgroundColor: loginTab ? "#A6EDFF" : "white",
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            setLoginTab(false);
          }}
          style={{
            backgroundColor: !loginTab ? "#A6EDFF" : "white",
          }}
        >
          회원가입
        </Button>
      </div> */}
      {/* {loginTab ? ( */}
      <Tabs className="loginTab" defaultActiveKey="1">
        <TabPane tab={<div className="tabBtn">로그인</div>} key="1">
          <div className="startForm">
            <h3 className="loginStart">존재 확인, 접속 합니다.</h3>
            <form className="loginForm">
              <div className="textTab">
                <span>ID</span>
                <input type="text" name="userId" required />
              </div>
              <div className="textTab">
                <span>PW</span>
                <input type="password" name="userPw" required />
              </div>
              <div className="loginButton">
                <button className="onMain" type="submit" onClick={onLogin}>
                  접속
                </button>
              </div>
            </form>
          </div>
        </TabPane>
        {/* ) : ( */}
        <TabPane tab={<div className="tabBtn">회원가입</div>} key="2">
          <div className="startForm">
            <h3 className="loginStart signupStart">존재를 생성합니다.</h3>
            <form className="loginForm signupForm">
              <div className="textTab">
                <span>ID</span>
                <input type="text" name="userId" required />
              </div>
              <div className="textTab">
                <span>PW</span>
                <input type="password" name="userPw" required />
              </div>
              <div className="textTab">
                <span>E-Mail</span>
                <input type="email" name="userEmail" required />
              </div>
              <div className="textTab">
                <span>Nickname</span>
                <input type="text" name="userNickName" required />
              </div>
              <div className="loginButton">
                <button className="onMain" type="submit">
                  생성
                </button>
              </div>
            </form>
          </div>
        </TabPane>
      </Tabs>
      {/* )} */}
    </div>
  );
};

export default LoginForm;
