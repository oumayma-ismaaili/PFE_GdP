const stats = [
  { name: "Total Projects", stat: "122" },
  { name: "Projects In Progress", stat: "19" },
  { name: "Projects Completed", stat: "89" },
];

const Header = () => {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Last 30 Days Overview
      </h3>
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
