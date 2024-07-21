import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import { createContext, useState } from "react";
import { routes } from "./routes";
import { chartsConfig } from "./config/chart/chartsConfig";
import Provider from "./provider/Provider";

export const UserAuthContext = createContext();


chartsConfig();

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);

  return (
    <Provider>
      <UserAuthContext.Provider
        value={{ user, setUser, loading, setLoading, save, setSave }}
      >
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </UserAuthContext.Provider>
    </Provider>
  );
};

export default App;
