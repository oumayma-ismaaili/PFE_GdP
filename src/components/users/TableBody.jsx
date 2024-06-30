import React from "react";

const TableBody = ({ users, handleEdit, handleDelete, role }) => {
  const getBadgeClass = (role) => {
    switch (role) {
      case "Developer":
        return "bg-sky-100 text-sky-800";
      case "Admin":
        return "bg-green-100 text-green-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <>
      {users.map((user) => (
        <tr key={user.email}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <img
                  className="h-10 w-10 object-cover rounded-full"
                  src={user.profile_img}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">
                  {user.first_name} {user.last_name}
                </div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{user.user_position}</div>
            <div className="text-gray-500">{user.city}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <span
              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getBadgeClass(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </td>
          {role == "Admin" && (
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
                className="text-green-600 hover:text-green-900"
                onClick={() => handleEdit(user.id)}
              >
                Edit<span className="sr-only">, {user.name}</span>
              </button>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

export default TableBody;
