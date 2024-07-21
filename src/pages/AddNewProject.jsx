import { useState, useRef, useContext } from "react";
import UserCombobox from "../layouts/UserCombobox";
import { FaGithub } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { UserAuthContext } from "../App";
import { supabase } from "../config/supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ProjectLeaderCombobox from "../layouts/ProjectLeaderCombobox";

export default function AddNewProject() {
  const { user } = useContext(UserAuthContext);
  const { role } = user;
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leader, setLeader] = useState(null);
  const formRef = useRef();

  const handleRemove = (userId) => {
    setTeam(team.filter((person) => person.id !== userId));
  };

  const generateUniqueProjectId = async () => {
    let uniqueId = uuidv4();
    let { data } = await supabase
      .from("projects")
      .select("id")
      .eq("id", uniqueId);

    while (data && data.length > 0) {
      uniqueId = uuidv4();
      data = await supabase.from("projects").select("id").eq("id", uniqueId);
    }

    return uniqueId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const formData = new FormData(formRef.current);

    const delayDate = new Date(formData.get("delay-date"));
    const currentDate = new Date();

    if (delayDate <= currentDate) {
      toast.error("The delay date must be greater than the current date.");
      setIsLoading(false); // Set loading state to false
      return;
    }

    const uniqueProjectId = await generateUniqueProjectId();

    const projectData = {
      project_id: uniqueProjectId,
      name: formData.get("project-name"),
      repo: formData.get("repository-link"),
      files: formData.get("files-link"),
      description: formData.get("description"),
      delay: formData.get("delay-date"),
      team: team.map((person) => person.CIN),
      created_by: user?.CIN,
      leader: leader.id,
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from("projects")
      .insert([projectData]);

    if (error) {
      console.error("Error inserting data: ", error);
      toast.error("Error inserting data.");
      setIsLoading(false); // Set loading state to false
      return;
    }

    toast.success("Project added successfully.");
    console.log("Project added successfully: ", data);

    // Update projects_integrated and project_id fields for all team members
    for (let person of team) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("projects_integrated")
        .eq("CIN", person.CIN)
        .single();

      if (userError) {
        console.error("Error fetching user data: ", userError);
        continue;
      }

      const newProjectsIntegrated = (userData.projects_integrated || 0) + 1;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          projects_integrated: newProjectsIntegrated,
          project_id: uniqueProjectId,
        })
        .eq("CIN", person.CIN);

      if (updateError) {
        console.error("Error updating user data: ", updateError);
      } else {
        console.log(`User ${person.CIN} data updated successfully`);
      }
    }

    setIsLoading(false); // Set loading state to false after submission is complete
  };

  return (
    <div className="bg-white rounded-lg px-6 shadow">
      <ToastContainer />
      <main className="px-4 pt-12 pb-12 lg:pb-16">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Project Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new project.
              </p>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="project-name"
                  id="project-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="repository-link"
                className="block text-sm pb-1 font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Repository Link
              </label>
              <div className="mt-1 sm:col-span-6 sm:mt-0">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    <FaGithub className="text-gray-900 w-6 h-6" />
                  </span>
                  <input
                    type="text"
                    name="repository-link"
                    id="repository-link"
                    autoComplete="repository-link"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="files-link"
                className="block text-sm pb-1 font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Necessary Files Link
              </label>
              <div className="mt-1 sm:col-span-6 sm:mt-0">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    <FaRegFolderOpen className="text-gray-900 w-6 h-6" />
                  </span>
                  <input
                    type="text"
                    name="files-link"
                    id="files-link"
                    autoComplete="files-link"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <label
                  htmlFor="add-team-members"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select the Project Manager
                </label>
                <p id="add-team-members-helper" className="sr-only">
                  Search by email address
                </p>
                <div className="flex">
                  <ProjectLeaderCombobox
                    setSelectedPerson={setLeader}
                    selectedPerson={leader}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="add-team-members"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Team Members
                </label>
                <p id="add-team-members-helper" className="sr-only">
                  Search by email address
                </p>
                <div className="flex">
                  <UserCombobox team={team} setTeam={setTeam} />
                </div>
              </div>

              <div>
                <ul role="list" className="divide-y divide-gray-200">
                  {team.map(
                    (person, index) =>
                      person !== null && (
                        <li
                          key={index}
                          className="flex py-4 items-center justify-between"
                        >
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={person?.profile_img}
                              alt=""
                            />
                            <div className="ml-3 flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {person?.first_name} {person?.last_name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {person?.email}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemove(person.id)}
                            className="text-sm font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>

            <div>
              <label
                htmlFor="delay-date"
                className="block text-sm font-medium text-gray-700"
              >
                Delay Date
              </label>
              <input
                type="date"
                name="delay-date"
                id="delay-date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/dashboard/projects"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
