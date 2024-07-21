import { useContext } from "react";
import { UserAuthContext } from "../App";

const Profile = () => {
  const { user } = useContext(UserAuthContext);

  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto bg-white dark:bg-gray-900 w-full shadow rounded-lg">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
            Profile Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-300">
            This information will be displayed publicly, so be careful what you
            share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                Full Name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900 dark:text-gray-100 capitalize">
                  {user?.first_name} {user?.last_name}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                Email Address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900 dark:text-gray-100">
                  {user?.email}
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                Title
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900 dark:text-gray-100">
                  {user?.user_position}
                </div>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
            Identification
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-300">
            Personal details and identification information
          </p>

          <ul
            role="list"
            className="mt-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800 text-sm leading-6"
          >
            <li className="flex justify-between gap-x-6 py-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  CIN
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
                    {user?.CIN}
                  </div>
                </dd>
              </div>
            </li>
            <li className="flex justify-between gap-x-6 py-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Birth Date
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
                    {user?.birth_date}
                  </div>
                </dd>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
            Preferences
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-300">
            Choose your language
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                Language
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900 dark:text-gray-100">English</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 dark:text-indigo-500 hover:text-indigo-500"
                >
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Profile;
