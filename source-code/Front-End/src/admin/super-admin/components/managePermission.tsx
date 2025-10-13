import React, { useState } from "react";

interface Permission {
  label: string;
  checked: boolean;
}

const ManagePermissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    "Create Articles": true,
    "Publish Articles": true,
    "Edit Articles": true,
    "Delete Articles": false,
    "View Articles": true,
    "Create Categories": false,
    "Edit Categories": false,
    "Delete Categories": false,
    "View Categories": true,
    "Manage Users": false,
  });

  const handleToggle = (label: string) => {
    setPermissions((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="min-h-screen py-10 px-8 flex flex-col items-center ">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Permissions
        </h1>
        <p className="text-gray-500">
          Configure access for the{" "}
          <span className="text-info font-medium cursor-pointer hover:underline">
            Editor
          </span>{" "}
          role.
        </p>
      </div>

      {/* Permissions Card */}
      <div className="card shadow-xl w-full max-w-4xl">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Permissions
          </h2>

          {/* Permissions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
            {Object.entries(permissions).map(([label, checked]) => (
              <label
                key={label}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  checked={checked}
                  onChange={() => handleToggle(label)}
                />
                <span className="text-gray-700 font-medium">{label}</span>
              </label>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-10">
            <button className="btn btn-info text-white px-6">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePermissions;
