const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <nav className="mt-4">
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            } rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm `}
          >
            Previous
          </button>
        </li>
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            } rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm `}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
