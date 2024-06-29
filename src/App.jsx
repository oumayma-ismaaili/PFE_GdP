import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { createContext, useState } from "react";
import AddNewUser from "./pages/AddNewUser";
import Users from "./pages/Users";
import AddNewProject from "./pages/AddNewProject";
import Projects from "./pages/Projects";

export const UserAuthContext = createContext();

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserAuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users/add_new_user" element={<AddNewUser />} />
            <Route path="projects/add_new_project" element={<AddNewProject/>} />
            <Route path="users" element={<Users />} />
            <Route path="projects" element={<Projects />} />
          </Route>
        </Routes>
      </UserAuthContext.Provider>
    </>
  );
};

export default App;
