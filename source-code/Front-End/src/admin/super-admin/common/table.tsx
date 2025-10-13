import React from "react";

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
  onRowClick?: (item: T) => void;
}

const Table = <T extends object>({
  data,
  columns,
  title,
  description,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title and Description */}
      {title && (
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      )}
      {description && (
        <p className="text-gray-500 mb-6">{description}</p>
      )}

      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="py-3 px-4 text-left">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.length > 0 ? (
                data.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <td key={String(col.key)} className="py-3 px-4 text-gray-700">
                        {col.render ? col.render(item) : String(item[col.key])}
                      </td>
                    ))}
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
      </div>
    </div>
  );
};

export default Table;
