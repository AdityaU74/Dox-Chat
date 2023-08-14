import React, { useContext } from "react";
import Subtract from "../img/Subtract.png";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="dox">
        <img
          src="https://img1.pnghut.com/21/2/7/CypgYDGcvP/icon-design-triangle-google-messaging-apps-online-chat.jpg"
          alt=""
        ></img>
        <span>Dox-Chat</span>
      </div>
      <div className="userp">
        <img src={currentUser.photoURL} alt=""></img>
      </div>
    </div>
  );
};

export default Navbar;
