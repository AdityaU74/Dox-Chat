import React, { useContext } from "react";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import serch from "../img/serch.png";

const Chat = (props) => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="to">
          <span>To: </span>
          <img src={data.user?.photoURL} onClick={props.toggle}></img>
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          {/* <img src={serch} alt="" />
          <img src={More} alt="" /> */}
          <span>@{data.user?.tweetHandle}</span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
