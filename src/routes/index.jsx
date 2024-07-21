import AddNewProject from "../pages/AddNewProject";
import AddNewUser from "../pages/AddNewUser";
import Analytics from "../pages/Analytics";
import CreateAnnouncements from "../pages/CreateAnnoucements";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import TasksCreated from "../pages/TasksCreated";
import TasksPage from "../pages/TasksPage";
import Team from "../pages/Team";
import Users from "../pages/Users";
import ValidTasks from "../pages/ValidTasks";


export const routes = [
  { path: "profile", element: <Profile /> },
  { path: "users/add_new_user", element: <AddNewUser /> },
  { path: "projects/add_new_project", element: <AddNewProject /> },
  { path: "users", element: <Users /> },
  { path: "projects", element: <Projects /> },
  { path: "tasks", element: <TasksPage /> },
  { path: "valid-tasks", element: <ValidTasks /> },
  { path: "createAnnoucements", element: <CreateAnnouncements /> },
  { path: "team", element: <Team/> },
  { path: "create-task", element: <TasksCreated /> },
  { path: "analytics", element: <Analytics /> },
];
