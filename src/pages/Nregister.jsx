import React, { useState, useCallback } from "react";
import { EthereumAuthProvider, SelfID } from "@self.id/web";
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getTweetId from "get-tweet-id";
import { useNavigate } from "react-router-dom";
const Nregister = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [twuser, setTwuser] = useState("");
  const [did, setDid] = useState("");
  const [finhan, setFinhan] = useState("");
  const [meta, setMeta] = useState("");
  const [img, setImg] = useState(null);
  const token = process.env.REACT_APP_BEARER_TOKEN;
  const conmeta = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const authProvider = new EthereumAuthProvider(window.ethereum, accounts[0]);
    const selfid = await SelfID.authenticate({
      authProvider: authProvider,
      ceramic: "testnet-clay",
      connectNetwork: "testnet-clay",
      threeidConnect: true,
    });
    setDid(selfid.did.id);
    setMeta(accounts[0]);
    console.log(accounts[0]);
    document.getElementById("meta1").innerHTML = "Connected";
  };
  const createTweetLink = useCallback(() => {
    const texts = encodeURIComponent(
      `Verifying my Twitter account for my decentralized identity ${did} on @ceramicnetwork.`
    );
    return `https://twitter.com/intent/tweet?text=${texts}`;
  }, [did]);
  const getRequest = async () => {
    const twid = await getTweetId(url);
    const params = {
      ids: twid,
      "tweet.fields": "author_id",
    };
    const res = await fetch(
      "https://nameless-bayou-04411.herokuapp.com/https://api.twitter.com/2/tweets?" +
        new URLSearchParams(params),
      {
        headers: {
          "User-Agent": "v2TweetLookupJS",
          authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      }
    );
    const rep = await res.json();
    if (rep.data) {
      console.log(rep.data);
      return rep.data[0];
    } else {
      return -1;
    }
  };
  const getName = async (idofu) => {
    const params = {
      ids: idofu,
    };
    const res = await fetch(
      "https://nameless-bayou-04411.herokuapp.com/https://api.twitter.com/2/users?" +
        new URLSearchParams(params),
      {
        headers: {
          "User-Agent": "v2UserLookupJS",
          authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
      }
    );
    const rep = await res.json();
    if (rep.data) {
      console.log(rep.data[0].username);
      return rep.data[0].username;
    } else {
      return -1;
    }
  };
  const verify = async () => {
    const toastId = toast.loading("Verifying...");
    const twit = await getRequest();
    if (twit === -1) {
      toast.error("Failed to verify tweet", {
        id: toastId,
      });
      return;
    } else {
      let bool1 = twit.text.includes(did);
      const twname = String(await getName(twit.author_id));
      const str1 = twname.toLowerCase();
      const str2 = twuser.toLowerCase();
      let bool2 = str1 === str2;
      if (bool1 && bool2) {
        toast.success("Attestation added!", { id: toastId });
        setFinhan(twuser);
      } else {
        toast.error("Failed to verify tweet", {
          id: toastId,
        });
      }
    }
  };
  const register = async () => {
    console.log(meta, finhan, text);
    // if (meta == "" || finhan == "" || text == "") {
    //   toast.error("Complete all the steps first");
    //   return;
    // }
    const email = `${meta}@doxdom.com`;
    const password = meta;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: meta,
    });
    const date = new Date().getTime();
    const storageRef = ref(storage, `${text + date}`);

    await uploadBytesResumable(storageRef, img).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await setDoc(doc(db, "users", meta), {
            uid: meta,
            displayName: text,
            photoURL: downloadURL,
            // tweetHandle: finhan,
          });

          await setDoc(doc(db, "userChats", meta), {});
        } catch (err) {
          console.log(err);
        }
      });
    });
    navigate("/");
  };
  const tohome = () => {
    navigate("/");
  };
  return (
    <div className="nregister">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="regform">
        <span className="s0"> Complete all following steps to register</span>
        <div className="meta">
          <span className="s1">1. Connect Metamask</span>
          <button className="b1" id="meta1" onClick={conmeta}>
            Connect
          </button>
        </div>
        <div className="user">
          <span className="s2">2. Enter username for your profile</span>
          <input
            type="text"
            placeholder="Enter Here"
            className="usersname"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* <div className="twitter">
          <span>3. Enter twitter username @</span>
          <input
            type="text"
            placeholder="Enter Here"
            className="usersname"
            onChange={(e) => setTwuser(e.target.value)}
          />
          <a href={createTweetLink()} target="_blank">
            <button className="b1">Tweet</button>
          </a>
        </div> */}
        {/* <div className="verify">
          <span className="s3">4. Paste tweet URL and verify</span>
          <input
            type="text"
            placeholder="Enter Here"
            className="usersname"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="b1" onClick={verify}>
            Verify
          </button>
        </div> */}
        <div className="pic">
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <span className="s3">5. Upload a profile picture</span>
          <label htmlFor="file">
            <div className="d1">Upload</div>
          </label>
        </div>
        <button className="b1" onClick={register}>
          Register
        </button>
        <div className="login">
          <span>Already registered?</span>
          <span className="s4" onClick={tohome}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nregister;
