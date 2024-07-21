import { useState, useEffect, useContext } from "react";
import GetStatusBadge from "../components/projects/GetStatusBadge";
import { supabase } from "../config/supabase/supabaseClient";
import EditProject from "../components/projects/EditProject";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../App";

export default function Projects() {
  const { user, save } = useContext(UserAuthContext);
  const { role, CIN } = user; // Destructure CIN from user object
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      let query = supabase.from("projects").select("*");

      if (role === "Leader") {
        query = query.eq("leader", CIN); // Filter projects where the leader is the current user
      }

      const { data: projectsData, error: projectsError } = await query;

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
        return;
      }

      const userIds = projectsData.map((project) => project.leader);

      const fetchUsers = async (userIds) => {
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("*")
          .in("CIN", userIds);

        if (usersError) {
          console.error("Error fetching users:", usersError);
          return [];
        }

        return usersData;
      };

      const usersData = await fetchUsers(userIds);

      const formattedData = projectsData.map((project) => {
        const leader = usersData.find((user) => user.CIN === project.leader);
        const createdAt = new Date(project.created_at);
        const deadline = new Date(project.delay);
        const now = new Date();
        const remainingTimeMs = deadline - now;
        const remainingTimeDays = Math.floor(
          remainingTimeMs / (1000 * 60 * 60 * 24)
        );

        let remainingTime;
        if (remainingTimeDays < 0) {
          remainingTime = "Past due";
        } else if (remainingTimeDays < 7) {
          remainingTime = `${remainingTimeDays} day${
            remainingTimeDays > 1 ? "s" : ""
          }`;
        } else if (remainingTimeDays < 30) {
          const weeks = Math.floor(remainingTimeDays / 7);
          remainingTime = `${weeks} week${weeks > 1 ? "s" : ""}`;
        } else if (remainingTimeDays < 365) {
          const months = Math.floor(remainingTimeDays / 30);
          remainingTime = `${months} month${months > 1 ? "s" : ""}`;
        } else {
          const years = Math.floor(remainingTimeDays / 365);
          remainingTime = `${years} year${years > 1 ? "s" : ""}`;
        }

        return {
          ...project,
          leader: leader
            ? {
                name: `${leader.first_name} ${leader.last_name}`,
                profile_img: leader.profile_img,
              }
            : { name: "Unknown", profile_img: "" },
          created_at: createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          delay: remainingTime,
        };
      });

      setProjects(formattedData);
    };

    fetchProjects();
  }, [save, role, CIN]);

  const handleOpenEditProject = (projectId) => {
    setProjectId(projectId);
    setOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white py-12 shadow rounded-lg">
      <EditProject open={open} setOpen={setOpen} project_id={projectId} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the projects including their name, leader, creation
            date, delay, and status.
          </p>
        </div>
        {(role === "Admin") && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/dashboard/projects/add_new_project"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            >
              Add project
            </Link>
          </div>
        )}
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Project Manager
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Delay
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {project.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 font-medium">
                  <div className="flex items-center space-x-4">
                    {project.leader.profile_img && (
                      <span>
                        <img
                          className="inline-block object-cover h-8 w-8 rounded-full"
                          src={project.leader.profile_img}
                          alt=""
                        />
                      </span>
                    )}
                    <span className="capitalize">{project.leader.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.created_at}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.delay}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                  {GetStatusBadge(project.status)}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  {role === "Admin" && (
                    <button
                      onClick={() => handleOpenEditProject(project.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit<span className="sr-only">, {project.name}</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
