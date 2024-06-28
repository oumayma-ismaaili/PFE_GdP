import React, { useState, useEffect } from "react";
import ChangeProfile from "../components/add_new_user/ChangeProfile";
import { personalInfoFields } from "../data/add_new_user";
import { supabase } from "../config/supabase/supabaseClient";

const roleOptions = [
  { id: "admin", label: "Admin" },
  { id: "user", label: "User" },
  { id: "manager", label: "Manager" },
];

export default function AddNewUser() {
  const [formValues, setFormValues] = useState({
    tasks: 0,
    projects_integrated: 0,
    projects_completed: 0,
  });

  const [profileImg, setProfileImg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (profileImg) {
      setFormValues({ ...formValues, ["profile_img"]: profileImg });
    }
  }, [profileImg]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values:", formValues);

    // Insert the new user into the Supabase database
    const { data, error } = await supabase.from("users").insert([formValues]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("User added successfully:", data);
    }
  };

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 shadow rounded-md bg-white dark:bg-gray-900 py-12">
      <form
        className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700"
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 sm:space-y-5">
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                Personal Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <ChangeProfile
                profileImg={profileImg}
                setProfileImg={setProfileImg}
              />
              {personalInfoFields.map((field) => (
                <div
                  key={field.id}
                  className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5"
                >
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                  >
                    {field.label}
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      autoComplete={field.autoComplete}
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ))}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                >
                  Birthdate
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="date"
                    name="birth_date"
                    id="birthdate"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
                >
                  Role
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    id="role"
                    name="role"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={handleInputChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roleOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
