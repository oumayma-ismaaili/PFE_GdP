import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../App";
import Navbar from "../components/Navbar";
import { supabase } from "../config/supabase/supabaseClient";
import { formatDistanceToNow } from "date-fns";

export default function DashboardLayout() {
  const { user, save } = useContext(UserAuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const location = useLocation();
  const current = location.pathname;
  const navigate = useNavigate();
  const removeRightCol = [].find((path) => current === path);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [save]);

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
                <div className="grid grid-cols-1 gap-4 lg:pr-8 px-6">
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
                              <li
                                key={announcement.id}
                                className="py-2 bg-gray-50 px-4 rounded-lg ring-1 ring-gray-100 my-2"
                              >
                                <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                  <p className="mt-1 text-xs mb-2 text-yellow-700 inline-block px-2 py-1 rounded-lg ring-1 ring-yellow-500 bg-yellow-50 font-semibold">
                                    {formatDistanceToNow(
                                      new Date(announcement.created_at),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </p>
                                  <h3 className="text-sm font-semibold text-gray-800">
                                    <span className="hover:underline focus:outline-none">
                                      <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                      />
                                      {announcement.object}
                                    </span>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {announcement.description}
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
                &copy; 2024 Oumaima Ismaaili.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
