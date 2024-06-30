import { useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { supabase } from "../config/supabase/supabaseClient";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectLeaderCombobox({
  selectedPerson,
  setSelectedPerson,
}) {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("CIN, first_name, last_name, profile_img, role")
        .neq("role", "Developer");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        const formattedUsers = data.map((user) => ({
          id: user.CIN,
          name: `${user.first_name} ${user.last_name}`,
          imageUrl: user.profile_img,
        }));
        setPeople(formattedUsers);
      }
    }

    fetchUsers();
  }, []);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={setSelectedPerson}
      className="w-full"
    >
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-green-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={person.imageUrl}
                        alt=""
                        className="h-6 object-cover w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {person.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-green-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
