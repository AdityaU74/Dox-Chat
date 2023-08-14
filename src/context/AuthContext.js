import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const ethereumProvider = window.ethereum;
  const getAccounts = async () => {
    const accounts = await ethereumProvider.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  };
  useEffect(() => {
    getAccounts().then((account) => {
      const docRef = doc(db, "users", account);
      console.log(account);
      getDoc(docRef).then((user) => {
        if (user.exists()) {
          console.log(user.data(), " userdata");
          if (user.data().displayName) {
            setCurrentUser(user.data());
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
