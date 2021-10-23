import React, { useState } from "react";
import { Button } from "antd";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [loginTab, setLoginTab] = useState(true);

  const history = useHistory();

  const onLogin = () => {
    history.push("/main");
  };

  return (
    <div className="login">
      <div className="formTitle">
        <Button
          onClick={() => {
            setLoginTab(true);
          }}
          style={{
            backgroundColor: loginTab ? "red" : "white",
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setLoginTab(false);
          }}
          style={{
            backgroundColor: loginTab ? "white" : "red",
          }}
        >
          Sign up
        </Button>
      </div>
      {loginTab ? (
        <div className="loginStartForm">
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
              <Button className="onMain" type="submit" onClick={onLogin}>
                접속
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="registStartForm">
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
              <Button className="onMain" type="submit" onClick={onLogin}>
                접속
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
