export const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Number of Projects",
        data: [10, 12, 15, 20, 18, 25, 22],
        fill: false,
        backgroundColor: "rgba(244, 63, 94, 0.5)",
        borderColor: "rgb(244, 63, 94)",
        borderWidth: 2,
      },
    ],
  };
  
  export const options = {
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
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Projects'
        }
      }
    }
  };
  