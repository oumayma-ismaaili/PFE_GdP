import { useState, useEffect } from "react";
import { supabase } from "../config/supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TasksCreated() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    user_id: "",
    project_id: "",
    date: "",
    image: "",
    completed: "pending", // Initialize completed field
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    let { data: users, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    } else {
      setUsers(users);
    }
  };

  const fetchProjects = async () => {
    let { data: projects, error } = await supabase.from("projects").select("*");
    if (error) {
      console.error("Error fetching projects:", error);
      toast.error("Error fetching projects.");
    } else {
      setProjects(projects);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.user_id ||
      !formData.project_id ||
      !formData.date
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Insert the new task into the Supabase database
    const { data: taskData, error: taskError } = await supabase
      .from("tasks")
      .insert([
        {
          name: formData.name,
          description: formData.description,
          user_id: formData.user_id,
          project_id: formData.project_id,
          delivery_date: formData.date,
          completed: formData.completed,
        },
      ]);

    if (taskError) {
      console.error("Error inserting task:", taskError);
      toast.error("Error inserting task.");
      setLoading(false);
      return;
    }

    // Update the user's project_id field
    const { error: userUpdateError } = await supabase
      .from("users")
      .update({ project_id: formData.project_id })
      .eq("id", formData.user_id);

    if (userUpdateError) {
      console.error("Error updating user project_id:", userUpdateError);
      toast.error("Error updating user project_id.");
      setLoading(false);
    } else {
      toast.success("Task created and user updated successfully.");
      setFormData({
        name: "",
        description: "",
        user_id: "",
        project_id: "",
        date: "",
        image: "",
        completed: "pending", // Reset the completed field
      });
      navigate("/dashboard/tasks");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white py-12 shadow rounded-lg px-4 sm:px-8">
      <ToastContainer />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Create a New Task
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Fill in the details below to create a new task.
          </p>
        </div>
      </div>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="project_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project
                </label>
                <select
                  id="project_id"
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.project_id} value={project.project_id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="user_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  User
                </label>
                <select
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link
              to="/dashboard/tasks"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
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
    </div>
  );
}
