import React, { useEffect, useState } from "react";
import "./Talk.css";
import { Button } from "antd";

const Talk = (props) => {
  const [index, setIndex] = useState(0);
  const data = props.data;
  // ?는 prop이 있을때 참조

  const onClick = (value) => {
    if (index + value < 0) return;

    if (index + value < data.length) {
      setIndex(index + value);
    }
  };

  const onClickSkip = () => {
    setIndex(data.length - 1);
  };

  useEffect(() => {
    if (index === data.length - 1) {
      props.onLastIndex?.(index);
    }
    props.onChangedIndex?.(index, data.length);
  }, [index]);
  // 콜백함수 ->

  return (
    <div className="chatIndex">
      <div className="chat" onClick={() => onClick(1)}>
        <div className="chatTop">
          <div className="chatName">{data[index].character}</div>
        </div>
        <div className="chatDial">
          {data[index].dialogue}
        </div>
      </div>
      <div className="chatSkipBtn">
        <Button 
          onClick={() => onClickSkip()}
          style={{
            backgroundColor: "#858cec",
          }}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export default Talk;
