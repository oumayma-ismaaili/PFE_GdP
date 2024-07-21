import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../config/supabase/supabaseClient";
import { FaGithub } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { UserAuthContext } from "../../App";

export default function EditProject({ project_id, open, setOpen }) {
  const { save, setSave, user } = useContext(UserAuthContext);
  const { role } = user;
  const [project, setProject] = useState({
    name: "",
    description: "",
    repo: "",
    files: "",
    created_by: "",
    status: "in progress", // Default status
    team: [],
  });
  const [teamProfiles, setTeamProfiles] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      if (project_id) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", project_id)
          .single();

        if (error) {
          console.error("Error fetching project:", error);
          toast.error("Error fetching project.");
        } else {
          setProject(data);
          if (data.team && data.team.length > 0) {
            fetchTeamProfiles(data.team);
          }
        }
      }
    };

    const fetchTeamProfiles = async (teamCINs) => {
      console.log("Fetching team profiles for CINs:", teamCINs); // Log team CINs
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .in("CIN", teamCINs);

      if (error) {
        console.error("Error fetching team profiles:", error);
      } else {
        setTeamProfiles(data);
        console.log("Team profiles fetched:", data); // Log fetched data
      }
    };

    fetchProject();
  }, [project_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("projects")
      .update({
        name: project.name,
        description: project.description,
        repo: project.repo,
        files: project.files,
        status: project.status,
        team: project.team,
      })
      .eq("id", project_id);

    if (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project.");
    } else {
      console.log("Project updated successfully:", data);
      setOpen(false); // Close the modal after successful update
      toast.success("Project updated successfully.");
    }
    setSave(!save);
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project_id);

    if (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project.");
    } else {
      console.log("Project deleted successfully");
      setOpen(false); // Close the modal after successful delete
      toast.success("Project deleted successfully.");
    }
    setSave(!save);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />
        <ToastContainer />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-green-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Edit Project
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-green-700 text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-green-300">
                            Edit the information below to update your project.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Project name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={project.name}
                                  onChange={(e) =>
                                    setProject({
                                      ...project,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={6}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={project.description}
                                  onChange={(e) =>
                                    setProject({
                                      ...project,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="repo"
                                className="block pb-1 text-sm font-medium text-gray-900"
                              >
                                Repository URL
                              </label>
                              <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                  <FaGithub className="text-gray-900 w-6 h-6" />
                                </span>
                                <input
                                  type="text"
                                  name="repo"
                                  id="repo"
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={project.repo}
                                  onChange={(e) =>
                                    setProject({
                                      ...project,
                                      repo: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="files"
                                className="block pb-1 text-sm font-medium text-gray-900"
                              >
                                Files URL
                              </label>
                              <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                  <FaRegFolderOpen className="text-gray-900 w-6 h-6" />
                                </span>
                                <input
                                  type="text"
                                  name="files"
                                  id="files"
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={project.files}
                                  onChange={(e) =>
                                    setProject({
                                      ...project,
                                      files: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                Team Members
                              </h3>
                              <div className="mt-2">
                                <div className="flex space-x-2">
                                  {teamProfiles.map((person, key) => (
                                    <div
                                      key={key}
                                      className="relative group"
                                    >
                                      <img
                                        className="inline-block object-cover h-8 w-8 rounded-full"
                                        src={person.profile_img}
                                        alt="team"
                                      />
                                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2 hidden group-hover:flex flex-col items-center">
                                        <div className="relative z-10 p-2 bg-gray-800 text-white font-semibold ring-1 ring-neutral-800 text-xs rounded-md shadow-lg">
                                          {person.first_name}{" "}{person.last_name}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <fieldset>
                              <legend className="text-sm font-medium text-gray-900">
                                Status
                              </legend>
                              <div className="mt-2 space-y-5">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="status-in-progress"
                                      name="status"
                                      aria-describedby="status-in-progress-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={project.status === "in progress"}
                                      onChange={() =>
                                        setProject({
                                          ...project,
                                          status: "in progress",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="status-in-progress"
                                      className="font-medium text-gray-900"
                                    >
                                      In Progress
                                    </label>
                                    <p
                                      id="status-in-progress-description"
                                      className="text-gray-500"
                                    >
                                      The project is currently in progress.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="status-in-review"
                                      name="status"
                                      aria-describedby="status-in-review-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={project.status === "in review"}
                                      onChange={() =>
                                        setProject({
                                          ...project,
                                          status: "in review",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="status-in-review"
                                      className="font-medium text-gray-900"
                                    >
                                      In Review
                                    </label>
                                    <p
                                      id="status-in-review-description"
                                      className="text-gray-500"
                                    >
                                      The project is currently under review.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="status-completed"
                                      name="status"
                                      aria-describedby="status-completed-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={project.status === "completed"}
                                      onChange={() =>
                                        setProject({
                                          ...project,
                                          status: "completed",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="status-completed"
                                      className="font-medium text-gray-900"
                                    >
                                      Completed
                                    </label>
                                    <p
                                      id="status-completed-description"
                                      className="text-gray-500"
                                    >
                                      The project has been completed.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="status-delivered"
                                      name="status"
                                      aria-describedby="status-delivered-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={project.status === "delivered"}
                                      onChange={() =>
                                        setProject({
                                          ...project,
                                          status: "delivered",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="status-delivered"
                                      className="font-medium text-gray-900"
                                    >
                                      Delivered
                                    </label>
                                    <p
                                      id="status-delivered-description"
                                      className="text-gray-500"
                                    >
                                      The project has been delivered.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <div>
                              {role === "Admin" && (
                                <button
                                  type="button"
                                  onClick={handleDelete}
                                  className="w-full bg-red-600 text-white font-medium text-sm py-2.5 rounded-md"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
