import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { supabase } from "../../../config/supabase/supabaseClient";

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "In Progress",
        data: [],
        backgroundColor: "rgba(147, 51, 234, 0.4)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      },
      {
        label: "In Review",
        data: [],
        backgroundColor: "rgba(250, 204, 21, 0.4)",
        borderColor: "rgb(250, 204, 21)",
        borderWidth: 1,
      },
      {
        label: "Completed",
        data: [],
        backgroundColor: "rgba(22, 163, 74, 0.4)",
        borderColor: "rgb(22, 163, 74)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("created_at, status");

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      console.log("Fetched projects:", projects);

      const months = ["January", "February", "March", "April", "May", "June", "July"];
      const statusCounts = {
        "in progress": Array(7).fill(0),
        "in review": Array(7).fill(0),
        "completed": Array(7).fill(0),
      };

      projects.forEach((project) => {
        const month = new Date(project.created_at).getMonth();
        if (month < 7) {
          const status = project.status.toLowerCase();
          if (statusCounts[status]) {
            statusCounts[status][month]++;
          }
        }
      });

      setChartData({
        labels: months,
        datasets: [
          {
            label: "In Progress",
            data: statusCounts["in progress"],
            backgroundColor: "rgba(147, 51, 234, 0.4)",
            borderColor: "rgb(147, 51, 234)",
            borderWidth: 1,
          },
          {
            label: "In Review",
            data: statusCounts["in review"],
            backgroundColor: "rgba(250, 204, 21, 0.4)",
            borderColor: "rgb(250, 204, 21)",
            borderWidth: 1,
          },
          {
            label: "Completed",
            data: statusCounts["completed"],
            backgroundColor: "rgba(22, 163, 74, 0.4)",
            borderColor: "rgb(22, 163, 74)",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Monthly Project Status",
      },
      legend: {
        position: "top",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="h-full relative">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
