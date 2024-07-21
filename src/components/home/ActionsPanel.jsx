import React, { useContext, useEffect, useState, useCallback } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { actions as defaultActions, LinksActions } from "../../data/home";
import { supabase } from "../../config/supabase/supabaseClient";
import { UserAuthContext } from "../../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ActionsPanel = () => {
  const { user } = useContext(UserAuthContext);
  const [actions, setActions] = useState(defaultActions);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repo, setRepo] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("repo, files")
        .eq("project_id", user.project_id)
        .single();

      if (data) {
        setRepo(data.repo);
        setFiles(data.files);
      } else {
        console.error(error);
      }
    };

    fetchProjectData();
  }, [user.project_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, usersData, tasksData] = await Promise.all([
          supabase.from("projects").select("*"),
          supabase.from("users").select("*"),
          supabase.from("tasks").select("*"),
        ]);

        setProjects(projectsData.data);
        setUsers(usersData.data);
        setTasks(tasksData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const sendEmail = useCallback(() => {
    setLoading(true)
    if (!projects.length || !users.length || !tasks.length) return;

    const userProject = projects.find(
      (project) => project.id === user.project_id
    );

    const templateParams = {
      to_name: `${user.first_name} ${user.last_name}`,
      to_email: user.email,
      from_name: "Oumaima Ismailly",
      project_name: userProject ? userProject.name : "Unknown Project",
      project_summary: `
      The project management app has achieved significant progress over
      the past month. We have successfully enhanced the system's functionality,
      improving user experience and operational efficiency.
      Key accomplishments include advanced project tracking, robust user management,
      and seamless task coordination.

        Key Metrics:
        - Total projects: ${projects.length}
        - Total tasks: ${tasks.length}
        - Total users: ${users.length}
      `,
      report_date: new Date().toLocaleDateString(),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          toast.success("Report sent successfully!");
          setLoading(false)
        },
        (err) => {
          toast.error("Failed to send report.");
          setLoading(false)
        }
      );
  }, [projects, users, tasks, user]);

  const filteredActions =
    user.role === "Developer"
      ? actions.filter(
          (action) => !["Analytics", "Settings"].includes(action.name)
        )
      : actions;

  return (
    <>
      {loading && (
        <div className="w-screen h-screen z-50 top-0 left-0 fixed flex items-center justify-center bg-black/50">
          <div className="border-green-500 h-12 w-12 animate-spin rounded-full border-8 border-t-white" />
        </div>
      )}
      <ToastContainer />
      <section aria-labelledby="quick-links-title">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          <h2 className="sr-only" id="quick-links-title">
            Quick links
          </h2>
          {LinksActions.map(
            (action, actionIdx) =>
              repo &&
              files && (
                <a
                  target="_blank"
                  href={actionIdx === 0 ? repo : files}
                  key={action.name}
                  className={classNames(
                    actionIdx === 0
                      ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                      : "",
                    actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                    actionIdx === LinksActions.length - 2 ? "" : "",
                    actionIdx === LinksActions.length - 1
                      ? " sm:rounded-bl-none"
                      : "",
                    "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 cursor-pointer"
                  )}
                >
                  <span
                    className={classNames(
                      action.iconBackground,
                      action.iconForeground,
                      "rounded-lg inline-flex p-3 ring-4 ring-white"
                    )}
                  >
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <a href={action.href} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </a>
              )
          )}
          {filteredActions.map((action, actionIdx) => (
            <div
              key={action.name}
              className={classNames(
                actionIdx === 0 ? "sm:rounded-tr-none" : "",
                actionIdx === filteredActions.length - 2
                  ? "sm:rounded-bl-lg"
                  : "",
                actionIdx === filteredActions.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              )}
            >
              <div>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    "rounded-lg inline-flex p-3 ring-4 ring-white"
                  )}
                >
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  {action.name === "Reports" ? (
                    <button
                      onClick={sendEmail}
                      className="focus:outline-none text-left"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.name}
                    </button>
                  ) : (
                    <Link to={action.to || "#"} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.name}
                    </Link>
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ActionsPanel;
