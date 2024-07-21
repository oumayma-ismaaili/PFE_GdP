import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { supabase } from "../../../config/supabase/supabaseClient";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Developers", "Leaders", "Admins"],
    datasets: [
      {
        label: "# of Users",
        data: [],
        backgroundColor: [
          "rgba(14, 165, 233, 0.4)",
          "rgba(79, 70, 229, 0.4)",
          "rgba(250, 204, 21, 0.4)",
        ],
        borderColor: [
          "rgb(14, 165, 233)",
          "rgb(79, 70, 229)",
          "rgb(250, 204, 21)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let { data: users, error } = await supabase
        .from("users")
        .select("role");

      if (error) {
        console.error(error);
        return;
      }

      const roleCounts = { Developers: 0, Leaders: 0, Admins: 0 };

      users.forEach((user) => {
        if (user.role === "Developer") {
          roleCounts.Developers++;
        } else if (user.role === "Leader") {
          roleCounts.Leaders++;
        } else if (user.role === "Admin") {
          roleCounts.Admins++;
        }
      });

      setChartData({
        labels: ["Developers", "Leaders", "Admins"],
        datasets: [
          {
            label: "# of Users",
            data: [roleCounts.Developers, roleCounts.Leaders, roleCounts.Admins],
            backgroundColor: [
              "rgba(14, 165, 233, 0.4)",
              "rgba(79, 70, 229, 0.4)",
              "rgba(250, 204, 21, 0.4)",
            ],
            borderColor: [
              "rgb(14, 165, 233)",
              "rgb(79, 70, 229)",
              "rgb(250, 204, 21)",
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Distribution by Role",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
