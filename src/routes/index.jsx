import AddNewProject from "../pages/AddNewProject";
import AddNewUser from "../pages/AddNewUser";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import Users from "../pages/Users";

export const routes = [
  { path: "profile", element: <Profile /> },
  { path: "users/add_new_user", element: <AddNewUser /> },
  { path: "projects/add_new_project", element: <AddNewProject /> },
  { path: "users", element: <Users /> },
  { path: "projects", element: <Projects /> },
  { path: "analytics", element: <Analytics/> },
];
