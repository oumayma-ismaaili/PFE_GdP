export const data = {
  labels: ["Developers", "Leaders", "Admins"],
  datasets: [
    {
      label: "# of Users",
      data: [50, 10, 5],
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
};

export const options = {
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
