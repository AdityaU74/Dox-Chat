import Home from "./pages/Home";
import Nregister from "./pages/Nregister";

import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser, loading } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <p>Loading</p>;
    }
    if (Object.keys(currentUser).length === 0) {
      console.log(currentUser, " no");
      return <Navigate to="/register" />;
    }
    console.log(currentUser, " yes");
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Nregister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
