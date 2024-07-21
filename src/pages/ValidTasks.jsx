import React, { useContext, useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { supabase } from "../config/supabase/supabaseClient";
import { TaskContext } from "../contexts";
import Modal from "../components/tasks/Modal";
import { UserAuthContext } from "../App";

export default function ValidTasks() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserAuthContext);
  const { setOpen, setData } = useContext(TaskContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("completed", "pending")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="w-full bg-white px-6 py-12 shadow rounded-lg">
      <div className="py-6 mb-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Your Tasks to Accomplish
        </h1>
        <p className="text-sm text-gray-700">
          You will find all your tasks here. Please mention if you complete any
          task.
        </p>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Modal />
        {tasks.map((task, index) => (
          <li
            key={index}
            className="col-span-1 border border-sky-900 bg-sky-700 rounded-lg shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-base font-medium text-white">
                    {task.name}
                  </h3>
                </div>
                <p className="mt-1 truncate text-sm text-gray-100">
                  {task.description}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex">
                <div className="flex bg-sky-300 ring-1 ring-sky-700 w-0 flex-1">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setData({
                        name: task.name,
                        description: task.description,
                        id: task.task_id,
                      });
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <CheckIcon
                      className="h-6 w-6 p-0.5 text-sky-100 bg-sky-800 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-sky-900">Task Completed?</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
