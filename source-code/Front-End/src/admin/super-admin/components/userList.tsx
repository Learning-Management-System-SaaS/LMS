// src/pages/TenantList.tsx
import { useNavigate } from "react-router-dom";
import { Tenant, mockUsers } from "../../../data/mockData";

interface UserListProps {
  onNewTenant: () => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  onNewTenant,
  onViewDetails,
  onEdit,
}) => {

  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <button
          className="btn btn-info text-white normal-case text-base rounded-md"
          onClick={onNewTenant}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New User
        </button>
      </div>

      {/* Tenant Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Header (Strict uppercase and gray background) */}
            <thead className="bg-gray-50">
              <tr>
                <th className="text-xs font-semibold text-gray-500 uppercase py-3 px-6 w-1/3">
                  NAME
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-1/3">
                  TENANT
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase text-center w-1/6">
                  ACTIONS
                </th>
              </tr>
            </thead>

            {/* Table Body (Normal rows, no zebra striping in the image) */}
            <tbody>
              {mockUsers.length > 0 ? (
                mockUsers.map((user) => (
                  <tr
                    onClick={()=>navigate('/admin/users/detail')}
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-4 px-6 text-sm text-gray-800 font-medium w-1/3">
                      {user.name}
                      <span className="block text-sm text-gray-400 ">{user.email}</span>
                    </td>
                    <td className="text-sm text-gray-800 w-1/3">
                      {user.tenantName}
                    </td>
                    <td className="text-center w-1/6">
                      <div className="flex justify-center items-center space-x-2">
                        {/* Edit Button (Light blue icon/hover) */}
                        <button className="btn btn-ghost btn-sm p-1 rounded hover:bg-blue-50 text-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        {/* Delete Button (Red icon/hover) */}
                        <button
                          className="btn btn-ghost btn-sm p-1 rounded hover:bg-red-50 text-red-500"
                          onClick={() => {}}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No Permission match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer (Pagination and result count) */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg">
          <span className="text-sm text-gray-600">Showing results</span>
          <div className="flex space-x-2">
            <button className="btn btn-ghost btn-sm normal-case text-gray-600 hover:bg-gray-100">
              Previous
            </button>
            <button className="btn btn-ghost btn-sm normal-case text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList