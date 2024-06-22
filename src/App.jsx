import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { createContext, useState } from "react";

export const UserAuthContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  return (
    <>
      <UserAuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserAuthContext.Provider>
    </>
  );
};

export default App;
