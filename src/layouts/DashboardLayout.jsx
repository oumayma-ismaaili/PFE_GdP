import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../App";
import Navbar from "../components/Navbar";

export const announcements = [
  {
    id: 1,
    title: "Navbar Completed",
    href: "#",
    preview:
      "The navbar component is fully implemented and integrated into the application. Check the latest build for updates.",
  },
  {
    id: 2,
    title: "Backend Integration Done",
    href: "#",
    preview:
      "The backend services are now fully integrated. You can start testing the API endpoints and data flows.",
  },
  {
    id: 3,
    title: "UI Enhancements Deployed",
    href: "#",
    preview:
      "Latest UI enhancements have been deployed. Review the changes for improved user experience and interface consistency.",
  },
  {
    id: 4,
    title: "Bug Fixes: Login Issues",
    href: "#",
    preview:
      "Resolved login issues related to session management. Please verify if the problems are fully addressed.",
  },
  {
    id: 5,
    title: "Performance Optimization",
    href: "#",
    preview:
      "Implemented several performance optimizations to reduce load times. Monitor the app for any improvements in speed.",
  },
];

export default function DashboardLayou() {
  const { user } = useContext(UserAuthContext);

  const location = useLocation();
  const current = location.pathname;
  const navigate = useNavigate();
  const removeRightCol = ["/dashboard/users/add_new_user"].find(
    (path) => current == path
  );

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <div className="min-h-full bg-gray-100">
        <Navbar user={user} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl lg:container">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div
                className={`grid grid-cols-1 gap-4 ${
                  !removeRightCol ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden">
                    <div className="p-6">
                      <Outlet />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              {!removeRightCol && (
                <div className="grid grid-cols-1 gap-4 lg:pr-8 pr-4">
                  {/* Announcements */}
                  <section aria-labelledby="announcements-title">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">
                        <h2
                          className="text-base font-medium text-gray-900"
                          id="announcements-title"
                        >
                          Announcements
                        </h2>
                        <div className="mt-6 flow-root">
                          <ul
                            role="list"
                            className="-my-5 divide-y divide-gray-200"
                          >
                            {announcements.map((announcement) => (
                              <li key={announcement.id} className="py-5">
                                <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                  <h3 className="text-sm font-semibold text-gray-800">
                                    <a
                                      href={announcement.href}
                                      className="hover:underline focus:outline-none"
                                    >
                                      {/* Extend touch target to entire panel */}
                                      <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                      />
                                      {announcement.title}
                                    </a>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {announcement.preview}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Your Company, Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
