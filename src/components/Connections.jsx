import React, { useContext } from "react";

const Connections = () => {
  return (
    <div className="connections">
      <div className="meta">
        <span>Connected To</span>
        <img
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a9q9vb3gzdnibfegyyma"
          alt=""
        ></img>
      </div>
      <div className="connect">
        <span>Find People Via</span>
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt=""
        ></img>
        <img
          src="https://i.pinimg.com/736x/c3/a6/da/c3a6da4c2e29fcf9d7225938d33c47fb.jpg"
          alt=""
        ></img>
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default Connections;
