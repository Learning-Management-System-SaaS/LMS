import React from "react";
 // if you use shadcn/ui
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-2xl p-10 w-[90%] sm:w-[400px] text-center">
        {/* 404 Title */}
        <h1 className="text-7xl font-bold text-blue-500 mb-3">404</h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl"
          onClick={() => (window.location.href = "/admin")}
        >
           <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      {/* Footer small text */}
      <p className="mt-6 text-gray-400 text-sm">© 2025 Your Company</p>
    </div>
  );
}
