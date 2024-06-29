import { useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { supabase } from "../config/supabase/supabaseClient";

export default function UserCombobox({ team, setTeam }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from Supabase table 'users'
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleSelection = (user) => {
    if (!user || !user.id) return;

    const isSelected = team.some(
      (selectedUser) => selectedUser?.id === user?.id
    );

    if (isSelected) {
      setTeam(team.filter((selectedUser) => selectedUser?.id !== user?.id));
    } else {
      setTeam([...team, user]);
    }
  };

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          const fullName = `${user?.first_name?.toLowerCase() || ""} ${
            user?.last_name?.toLowerCase() || ""
          }`;
          return fullName.includes(query.toLowerCase());
        });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Combobox
      as="div"
      value={team}
      onChange={handleSelection}
      className="w-full"
    >
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(user) =>
            user ? `${user.first_name || ""} ${user.last_name || ""}` : ""
          }
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredUsers.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredUsers.map((user) => {
              if (!user || !user.id) return null;

              const isSelected = team.some(
                (selectedUser) => selectedUser?.id === user?.id
              );
              return (
                <Combobox.Option
                  key={user?.id}
                  value={user}
                  disabled={isSelected} // Disable if already selected
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
                      isSelected && "bg-gray-50 text-gray-900" // Highlight if selected
                    )
                  }
                >
                  {({ active }) => (
                    <>
                      <div className="flex items-center">
                        <img
                          src={user.profile_img}
                          alt=""
                          className="h-6 w-6 flex-shrink-0 rounded-full object-cover"
                        />
                        <span
                          className={classNames(
                            "ml-3 truncate",
                            isSelected && "font-semibold"
                          )}
                        >
                          {`${user.first_name} ${user.last_name}`}
                        </span>
                      </div>

                      {isSelected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            "text-green-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
