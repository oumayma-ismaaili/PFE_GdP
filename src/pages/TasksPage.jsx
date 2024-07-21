import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabase/supabaseClient";
import { UserAuthContext } from "../App";
import TruncatedText from "../components/tasks/TruncatedText";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

export default function Tasks() {
  const { user } = useContext(UserAuthContext);
  const { id, role, project_id } = user;
  const [save, setSave] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: tasksData, error: tasksError },
          { data: projectsData, error: projectsError },
          { data: usersData, error: usersError },
        ] = await Promise.all([
          supabase.from("tasks").select("*"),
          supabase.from("projects").select("*"),
          supabase.from("users").select("*"),
        ]);

        if (tasksError) throw tasksError;
        if (projectsError) throw projectsError;
        if (usersError) throw usersError;

        const enrichedTasks = tasksData.map((task) => ({
          ...task,
          project: projectsData.find((p) => p.id === task.project_id)?.name,
          user: usersData.find((u) => u.id === task.user_id)?.name,
          formattedDate: formatDate(task.delivery_date),
        }));

        setTasks(enrichedTasks);
        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [save]);

  const uniqueProjects = [
    { id: "All", name: "All" },
    ...projects.map((project) => ({ id: project.id, name: project.name })),
  ];

  const filteredTasks = tasks
    .filter((task) => {
      if (role === "Developer" || role === "Leader") {
        console.log(
          `Filtering tasks for role: ${role} and project_id: ${project_id}`
        );
        console.log(`Task project_id: ${task.project_id}`);
        return task.project_id === project_id;
      }
      return true;
    })
    .filter((task) => {
      console.log(`Filtering tasks for selected project: ${selectedProject}`);
      return selectedProject === "All"
        ? true
        : task.project_id === selectedProject;
    });

  const handleValidate = async (taskId) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_valid: true, completed: "completed" })
        .eq("task_id", taskId);

      setSave(!save);
      if (error) throw error;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, is_valid: true, completed: "completed" }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("task_id", taskId);

      setSave(!save);

      if (error) throw error;

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 shadow rounded-lg bg-white py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the tasks including their name, description, user,
            project, status, and date.
          </p>
        </div>
        {(role === "Admin" || role === "Leader") && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/dashboard/create-task"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Task
            </Link>
          </div>
        )}
      </div>
      <div
        className="pt-6"
        style={{ display: role === "Admin" ? "block" : "none" }}
      >
        <label
          htmlFor="project"
          className="block text-sm font-medium text-gray-700"
        >
          Select a project
        </label>
        <select
          id="project"
          name="project"
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {uniqueProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Task Owner
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    {(role === "Admin" || role === "Leader") && (
                      <>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Validate</span>
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTasks.map((task, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900 font-medium">
                          {task.name}
                        </div>
                        <div className="text-gray-500 max-w-3xl text-wrap">
                          <TruncatedText text={task.description} maxLength={80} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                users.find((user) => user.id == task.user_id)
                                  ?.profile_img
                              }
                              alt={task.user}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {
                                users.find((user) => user.id == task.user_id)
                                  ?.first_name
                              }{" "}
                              {
                                users.find((user) => user.id == task.user_id)
                                  ?.last_name
                              }
                            </div>
                            <div className="text-gray-500">
                              {
                                projects.find(
                                  (project) => project.project_id == task.project_id
                                )?.name
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            task.completed === "in review"
                              ? "bg-yellow-100 text-yellow-800"
                              : task.completed === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {task.completed}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.formattedDate}
                      </td>

                      {(role === "Admin" || role === "Leader") && (
                        <>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              className={`${
                                task.completed !== "in review"
                                  ? "opacity-20 text-gray-600 hover:text-gray-900"
                                  : "text-blue-600 hover:text-blue-900 cursor-pointer"
                              }`}
                              onClick={() => handleValidate(task.task_id)}
                              disabled={task.completed !== "in review"}
                            >
                              Validate
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(task.task_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
