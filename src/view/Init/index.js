import React, { useState } from "react";
import Talk from "../../components/Talk";
import "./index.css";
import LoginForm from "../../components/LoginForm";

const character_1 = "나";
const character_2 = "???";

const line = [
  {
    id: 1,
    character: character_1,
    dialogue: "크윽, 죽고.. 싶지 않아 ..! 한번 더 .. 기회가 있다면..!",
    isMe: true,
  },
  {
    id: 2,
    character: character_1,
    dialogue: "..뭐, 뭐지..? ..!..",
    isMe: true,
  },
  {
    id: 3,
    character: character_1,
    dialogue: "어라? 내가 방금까지 뭐하고 있었지?",
    isMe: true,
  },
  {
    id: 4,
    character: character_1,
    dialogue: "엥? 이건 뭐야.",
    isMe: true,
  },
  {
    id: 5,
    character: character_2,
    dialogue: "아, 정신을 차렸군요",
    isMe: false,
  },
  {
    id: 6,
    character: character_2,
    dialogue:
      "당신은 원래 죽었어야 할 몸. 하지만 지금의 당신은 모르는 본인의 숨겨진 힘이 다시 시작하길 원했습니다.",
    isMe: false,
  },
  {
    id: 7,
    character: character_2,
    dialogue:
      "제가 다 알려드릴 수는 없지만 운명이 정해준 당신의 길은 모험자의 길.. 이 길은 험난하겠지만 당신이라면 할 수 있을 겁니다. 수락하시겠습니까?",
    isMe: false,
  },
  {
    id: 8,
    character: character_1,
    dialogue: "그럴수가, 말도안돼… 말도 안 되지만 믿어야겠지..?",
    isMe: true,
  },
  {
    id: 9,
    character: character_1,
    dialogue:
      "죽었다 살아나서 보고 있는 게 게임 인터페이스라니.. 너무 비현실 적이라서 오히려 차분해지는 느낌이네.",
    isMe: true,
  },
];

const Index = () => {
  const [registForm, setRegistForm] = useState(false);

  return (
    <div>
      {registForm && <LoginForm />}
      <Talk
        data={line}
        onLastIndex={(i) => {
          setRegistForm(true);
        }}
        onChangedIndex={(n, length) => {
          if (n < length - 1) {
            setRegistForm(false);
          }
        }}
      />
      {/* <Modal></Modal> */}
    </div>
  );
};

export default Index;
