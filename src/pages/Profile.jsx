import { Switch } from "@headlessui/react";
import { useContext, useState } from "react";
import { UserAuthContext } from "../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const { user } = useContext(UserAuthContext);

  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto bg-white w-full shadow rounded-lg">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900 capitalize">
                  {user?.first_name} {user?.last_name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{user?.email}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Title
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{user?.user_position}</div>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            CIN
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">{user?.CIN}</p>

          <ul
            role="list"
            className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
          >
            <li className="flex justify-between gap-x-6 py-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  CIN
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">{user?.CIN}</div>
                </dd>
              </div>
            </li>
            <li className="flex justify-between gap-x-6 py-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Birth Date
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900">{user?.birth_date}</div>
                </dd>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Language and dates
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Choose what language and date format to use throughout your account.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Language
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">English</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </dd>
            </div>

            <Switch.Group as="div" className="flex pt-6">
              <Switch.Label
                as="dt"
                className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
                passive
              >
                Light mode
              </Switch.Label>
              <dd className="flex flex-auto items-center justify-end">
                <Switch
                  checked={automaticTimezoneEnabled}
                  onChange={setAutomaticTimezoneEnabled}
                  className={classNames(
                    automaticTimezoneEnabled ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      automaticTimezoneEnabled
                        ? "translate-x-3.5"
                        : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </dd>
            </Switch.Group>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Profile;
