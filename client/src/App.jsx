import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Head from "./components/header/Head"
import AuthContext from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/chatContext";
import ChangePassword from "./pages/ChangePassword";


function App() {
  const navigate = useNavigate();
  const { currentUser, userId } = useContext(AuthContext);
  const [isSelected, setIsSelected] = useState(0); //for header components

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // console.log("currentUser at app: ", currentUser);

  return (
    <>
      <ChatContextProvider currentUser={currentUser}>
        <Head isSelected={isSelected} setIsSelected={setIsSelected} />
        <Routes>
          {userId ? (
            <>
              <Route path="/" element={<Chat index={isSelected} />} />
            </>
          ) : (
            <Route path="/" element={<Home />} />
          )}

          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/change-password' element={<ChangePassword />} />

          {/* Catch-all Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </ChatContextProvider>
    </>
  );
}

export default App;