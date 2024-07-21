import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { supabase } from "../../../config/supabase/supabaseClient";

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Number of Projects",
        data: [],
        fill: false,
        backgroundColor: "rgba(244, 63, 94, 0.5)",
        borderColor: "rgb(244, 63, 94)",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("created_at");

      if (error) {
        console.error(error);
        return;
      }

      const monthCounts = Array(12).fill(0);

      projects.forEach((project) => {
        const month = new Date(project.created_at).getMonth();
        monthCounts[month]++;
      });

      setChartData({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Number of Projects",
            data: monthCounts.slice(0, 7),
            fill: false,
            backgroundColor: "rgba(244, 63, 94, 0.5)",
            borderColor: "rgb(244, 63, 94)",
            borderWidth: 2,
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
        text: "Monthly Number of Projects",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Projects",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
