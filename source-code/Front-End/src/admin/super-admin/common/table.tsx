import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSort from "./filterSort";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode; // Optional custom rendering
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  description?: string;
  action?: boolean;
  onRowClick?: (item: T) => void;
  searchFn: (Item: T, term: String) => boolean;
}

const Table = <T extends object>({
  data,
  columns,
  title,
  description,
  action = false,
  onRowClick,
  searchFn,
}: TableProps<T>) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subToDeleteId, setSubToDeleteId] = useState<string | null>(null);

  // --- Filtering and Pagination Logic (Strictly based on Image 1) ---
  const filteredData = searchTerm
    ? data.filter((item) => (searchFn ? searchFn(item, searchTerm) : true))
    : data;

  const itemsPerPage = 5; // As suggested by "Showing 1 to 5 of 10 results" in the image
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = filteredData.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const currentData = filteredData.slice(startIndex, endIndex);
  const addRecord = () => {
    navigate(`new${title?.toLocaleLowerCase().slice(0, -1)}`);
  };

  // --- Utility Functions ---
  const getStatusBadgeClass = (status: String) => {
    // Mapping colors strictly from the image
    console.log(status);
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-600 border border-blue-200"; // Light Blue/Cyan look
      case "Cancelled":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200"; // Yellow/Orange look
      case "Expired":
        return "bg-red-100 text-red-600 border border-red-200"; // Light Red/Pink look
      case "Inactive":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200"; // Light Red/Pink look
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title and Description */}
      {title && (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 ">{title}</h1>
          <button
            className="btn btn-info text-white normal-case text-base rounded-md"
            onClick={addRecord}
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
            Add {title.slice(0, -1)}
          </button>
        </div>
      )}
      {description && <p className="text-gray-500 mb-6">{description}</p>}
      {/* Search Component */}
      <FilterSort searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="py-3 px-4 ">
                    {col.label}
                  </th>
                ))}
                {action && <th>Action</th>}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <td key={String(col.key)}>
                        {col.key === "status" ? (
                          <div
                            className={` ${
                              col.key === "status"
                                ? "badge text-xs font-bold rounded-full " +
                                  getStatusBadgeClass(String(item[col.key]))
                                : "text-gray-700"
                            }`}
                          >
                            {col.render
                              ? col.render(item)
                              : String(item[col.key])}
                          </div>
                        ) : col.render ? (
                          col.render(item)
                        ) : (
                          String(item[col.key])
                        )}
                      </td>
                    ))}
                    <td className="text-center w-1/6">
                      <div className="flex  items-center space-x-2">
                        {/* Edit Button (Light blue icon/hover) */}
                        <button
                          onClick={() => console.log("updated")}
                          className=" p-1 text-blue-500"
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        {/* Delete Button (Red icon/hover) */}
                        <button
                          className=" p-1 text-red-500"
                          onClick={() => {
                            console.log("deleted");
                          }}
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
                  <td
                    colSpan={columns.length}
                    className="py-6 text-center text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Table Footer (Pagination and result count) */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg">
          <span className="text-sm text-gray-600">
            Showing {Math.min(startIndex + 1, totalResults)} to {endIndex} of{" "}
            {totalResults} results
          </span>
          <div className="join grid grid-cols-2">
            <button
              className="join-item btn btn-outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              // disabled={currentPage === 1}
            >
              Previous
            </button>
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              checked={true}
            />
            <input
              className="join-item btn btn-square "
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="4"
            />{" "}
            <button
              className="join-item btn btn-outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              // disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
