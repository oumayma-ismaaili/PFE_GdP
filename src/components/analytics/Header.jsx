import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase/supabaseClient";

const Header = () => {
  const [stats, setStats] = useState([
    { name: "Total Projects", stat: "Loading..." },
    { name: "Total Tasks", stat: "Loading..." },
    { name: "Total Users", stat: "Loading..." },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      const { count: tasksCount } = await supabase
        .from("tasks")
        .select("*", { count: "exact", head: true });

      const { count: usersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      setStats([
        { name: "Total Projects", stat: projectsCount },
        { name: "Total Tasks", stat: tasksCount },
        { name: "Total Users", stat: usersCount },
      ]);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Header;
