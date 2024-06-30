export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "In Progress",
      data: [12, 15, 10, 20, 18, 22, 19],
      backgroundColor: "rgba(147, 51, 234, 0.4)",
      borderColor: "rgb(147, 51, 234)",
      borderWidth: 1,
    },
    {
      label: "In Review",
      data: [8, 10, 12, 15, 9, 11, 14],
      backgroundColor: "rgba(250, 204, 21, 0.4)",
      borderColor: "rgb(250, 204, 21)",
      borderWidth: 1,
    },
    {
      label: "Completed",
      data: [5, 7, 9, 11, 13, 15, 17],
      backgroundColor: "rgba(22, 163, 74, 0.4)",
      borderColor: "rgb(22, 163, 74)",
      borderWidth: 1,
    },
  ],
};

export const options = {
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
