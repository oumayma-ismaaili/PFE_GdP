import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../config/supabase/supabaseClient";
import { UserAuthContext } from "../../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUser({ user_id, open, setOpen }) {
  const { setSave, save, user: contextUser } = useContext(UserAuthContext);
  const { role } = contextUser;
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "", // Add role field
    // Add more fields as necessary
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (user_id) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user_id)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
          toast.error("Error fetching user.");
        } else {
          setUser(data);
        }
      }
    };

    fetchUser();
  }, [user_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .update({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role, // Update role
        // Add more fields as necessary
      })
      .eq("id", user_id);

    if (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    } else {
      console.log("User updated successfully:", data);
      setOpen(false); // Close the modal after successful update
      toast.success("User updated successfully.");
    }
    setSave(!save);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("users").delete().eq("id", user_id);

    if (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user.");
    } else {
      console.log("User deleted successfully");
      setOpen(false); // Close the modal after successful delete
      toast.success("User deleted successfully.");
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
                            Edit User
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
                            Edit the information below to update the user.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-900"
                              >
                                First Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={user.first_name}
                                  onChange={(e) =>
                                    setUser({
                                      ...user,
                                      first_name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Last Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={user.last_name}
                                  onChange={(e) =>
                                    setUser({
                                      ...user,
                                      last_name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-1">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                  value={user.email}
                                  onChange={(e) =>
                                    setUser({
                                      ...user,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <fieldset>
                              <legend className="text-sm font-medium text-gray-900">
                                Role
                              </legend>
                              <div className="mt-2 space-y-5">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="role-admin"
                                      name="role"
                                      aria-describedby="role-admin-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={user.role === "Admin"}
                                      onChange={() =>
                                        setUser({
                                          ...user,
                                          role: "Admin",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="role-admin"
                                      className="font-medium text-gray-900"
                                    >
                                      Admin
                                    </label>
                                    <p
                                      id="role-admin-description"
                                      className="text-gray-500"
                                    >
                                      The user has administrative privileges.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="role-developer"
                                      name="role"
                                      aria-describedby="role-developer-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={user.role === "Developer"}
                                      onChange={() =>
                                        setUser({
                                          ...user,
                                          role: "Developer",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="role-developer"
                                      className="font-medium text-gray-900"
                                    >
                                      Developer
                                    </label>
                                    <p
                                      id="role-developer-description"
                                      className="text-gray-500"
                                    >
                                      The user is a developer.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="role-leader"
                                      name="role"
                                      aria-describedby="role-leader-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                                      checked={user.role === "Leader"}
                                      onChange={() =>
                                        setUser({
                                          ...user,
                                          role: "Leader",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="role-leader"
                                      className="font-medium text-gray-900"
                                    >
                                      Leader
                                    </label>
                                    <p
                                      id="role-leader-description"
                                      className="text-gray-500"
                                    >
                                      The user is a team leader.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            {/* Add more fields as necessary */}
                          </div>
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
