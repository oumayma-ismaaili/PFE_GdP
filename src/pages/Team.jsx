import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../App";
import { supabase } from "../config/supabase/supabaseClient";

export default function Team() {
  const { user } = useContext(UserAuthContext);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProjectAndUsers();
    }
  }, [user]);

  const fetchProjectAndUsers = async () => {
    try {
      // Step 1: Fetch the project based on user_project_id
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("team")
        .eq("project_id", user.project_id)
        .single();

      if (projectError) {
        console.error("Error fetching project:", projectError);
        return;
      }

      if (projectData && projectData.team) {
        const teamCINs = projectData.team;

        // Step 2: Fetch users based on team CINs
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("*")
          .in("CIN", teamCINs)
          .neq("CIN", user.CIN);

        if (usersError) {
          console.error("Error fetching users:", usersError);
          return;
        }

        setPeople(usersData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {!people.length && (
        <div className="w-full rounded-lg shadow bg-white py-12 px-8 sm:px-6">
          <h3>You don't have any team for your last project</h3>
        </div>
      )}
      {people.map((person) => (
        <li
          key={person.email}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {person.first_name} {person.last_name}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {person.role}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {person.user_position}
              </p>
            </div>
            <img
              className="h-10 w-10 object-cover flex-shrink-0 rounded-full bg-gray-300"
              src={person.profile_img}
              alt=""
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Email</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
