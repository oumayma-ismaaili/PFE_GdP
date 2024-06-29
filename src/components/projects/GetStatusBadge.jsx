const GetStatusBadge = (status) => {
  const statusCap = status.charAt(0).toUpperCase() + status.slice(1);
  let badgeClass = "";
  switch (statusCap) {
    case "In progress":
      badgeClass =
        "inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800";
      break;
    case "In review":
      badgeClass =
        "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800";
      break;
    case "Completed":
      badgeClass =
        "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800";
      break;
    case "Delivered":
      badgeClass =
        "inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800";
      break;
    default:
      badgeClass = "";
      break;
  }
  return <span className={badgeClass}>{status}</span>;
};

export default GetStatusBadge;
