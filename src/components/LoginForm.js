import React, { useState, useEffect } from "react";
import { Tabs, notification } from "antd";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { TabPane } = Tabs;

const LoginForm = () => {
  const [tabIndex, setTabIndex] = useState("1");
  const [userData, setUserData] = useState(null);

  const [logId, setLogId] = useState("");
  const [logPw, setLogPw] = useState("");

  const [regiId, setRegiId] = useState("");
  const [regiPw, setRegiPw] = useState("");
  const [regiEmail, setRegiEmail] = useState("");
  const [regiNickName, setRegiNickName] = useState("");

  const history = useHistory();

  const loadUserData = async() => {
    try {
      const res = await axios({
          method: 'get',
          url: '/user',
      });
      if(res.status === 200)
      {
        setUserData(res.data);
        history.push("/main");
      }
      
    } catch {
      history.push("/");
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  const onLogin = async() => {

    if(logId === "") {
      notification.open({
        message: '경고',
        description: '아이디를 입력해 주세요.',
      });
      return;
    }
    try {
      const res = await axios({
        method: 'post',
        url: '/login',
        headers: {
          'X-Requested-With': "XMLHttpRequest",
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
        data: {
          "userId" : logId,
          "userPwd" : logPw,
        }
      });
  
      if(res.status === 200) {
        history.push("/main");
      }
    } catch {
      notification.open({
        message: '안내',
        description: '로그인에 실패했습니다.',
      });
    }
  };

  const onRegist = async() => {
    let emailReg = /^([0-9a-zA-Z_\.-]+)@([a-zA-Z-]+)(\.[a-zA-Z-]+){1,2}$/i;

    if(regiId.length < 5) {
      notification.open({
        message: '경고',
        description: '아이디는 최소 5글자 입니다.',
      });
      return;
    } else if(regiId.length > 15) {
      notification.open({
        message: '경고',
        description: '아이디는 최대 15글자 입니다.',
      });
      return;
    } else if(regiPw.length < 5) {
      notification.open({
        message: '경고',
        description: '비밀번호는 최소 5글자 입니다.',
      });
      return;
    } else if(regiPw.length > 20) {
      notification.open({
        message: '경고',
        description: '비밀번호는 최대 20글자 입니다.',
      });
      return;
    } else if(!emailReg.test(regiEmail)) {
      notification.open({
        message: '경고',
        description: '이메일을 정확하게 입력해주세요.',
      });
      return;
    } else if(regiNickName.length < 2) {
      notification.open({
        message: '경고',
        description: '닉네임은 최소 2글자 입니다.',
      });
      return;
    } else if(regiNickName.length > 8) {
      notification.open({
        message: '경고',
        description: '닉네임은 최대 8글자 입니다.',
      });
      return;
    }

    try {
      const sameId = await axios({
        method: 'get',
        url: `/user/valid/userId/${regiId}`,
      });
      
      if(sameId.status !== 200) {
        notification.open({
          message: '경고',
          description: '중복 아이디 입니다.',
        });
      }
      else if(!sameId.data)
      {
        notification.open({
          message: '경고',
          description: '중복 아이디 입니다.',
        });
      }
    } catch {
      notification.open({
        message: '경고',
        description: '중복 아이디 입니다.',
      });
    }

    try {
      const sameNick = await axios({
        method: 'post',
        url: '/user/valid/nickname',
        data: {
          "nickname" : regiNickName,
        }
      });

      if(sameNick.status !== 200) {
        notification.open({
          message: '경고',
          description: '중복 닉네임 입니다.',
        });
      }
      else if(!sameNick.data)
      {
        notification.open({
          message: '경고',
          description: '중복 닉네임 입니다.',
        });
      }
    } catch {
      notification.open({
        message: '경고',
        description: '중복 닉네임 입니다.',
      });
    }

    try {
      const sameEmail = await axios({
        method: 'post',
        url: '/user/valid/email',
        data: {
          "email" : regiEmail,
        }
      });

      if(sameEmail.status !== 200) {
        notification.open({
          message: '경고',
          description: '중복 이메일 입니다.',
        });
      }
      else if(!sameEmail.data)
      {
        notification.open({
          message: '경고',
          description: '중복 이메일 입니다.',
        });
      }

    } catch {
      notification.open({
        message: '경고',
        description: '중복 이메일 입니다.',
      });
    }

      const res = await axios({
        method: 'post',
        url: '/user',
        data: {
          "userId" : regiId,
          "userPwd" : regiPw,
          "nickname" : regiNickName,
          "email" : regiEmail,
        }
      });
  
      if(res.status === 200) {
        setRegiId("")
        setRegiPw("")
        setRegiEmail("")
        setRegiNickName("")
        setTabIndex("1")
      }
    
  }

  return (
    <div className="login">
      <Tabs
        className="loginTab"
        activeKey={tabIndex}
        onChange={(key) => setTabIndex(key)}
        tabBarStyle={{
          color: "#fff",
        }}
      >
        <TabPane tab={<div className="tabBtn">로그인</div>} key="1">
          <form method="post" className="startForm">
            <h3 className="loginStart">존재 확인, 접속 합니다.</h3>
            <div className="loginForm">
              <div className="textTab">
                <span>ID</span>
                <input value={logId} onChange={(e) => setLogId(e.target.value)} type="text" name="userId" required />
              </div>
              <div className="textTab">
                <span>PW</span>
                <input value={logPw} onChange={(e) => setLogPw(e.target.value)} type="password" name="userPw" required onKeyPress={(e) => e.key == "Enter" && onLogin()} />
              </div>
              <div className="loginButton">
                <button className="onMain" type="button" onClick={onLogin}>
                  접속
                </button>
              </div>
            </div>
          </form>
        </TabPane>

        <TabPane tab={<div className="tabBtn">회원가입</div>} key="2">
          <form method="post" className="startForm">
            <h3 className="loginStart signupStart">존재를 생성합니다.</h3>
            <div className="loginForm signupForm">
              <div className="textTab">
                <span>ID</span>
                <input value={regiId} onChange={(e) => setRegiId(e.target.value)} type="text" name="userId" required />
              </div>
              <div className="textTab">
                <span>PW</span>
                <input value={regiPw} onChange={(e) => setRegiPw(e.target.value)} type="password" name="userPw" required />
              </div>
              <div className="textTab">
                <span>E-Mail</span>
                <input value={regiEmail} onChange={(e) => setRegiEmail(e.target.value)} type="email" name="userEmail" required />
              </div>
              <div className="textTab">
                <span>Nickname</span>
                <input value={regiNickName} onChange={(e) => setRegiNickName(e.target.value)} type="text" name="userNickName" required onKeyPress={(e) => e.key == "Enter" && onRegist()} />
              </div>
              <div className="loginButton">
                <button className="onMain" type="button" onClick={onRegist}>
                  생성
                </button>
              </div>
            </div>
          </form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LoginForm;
