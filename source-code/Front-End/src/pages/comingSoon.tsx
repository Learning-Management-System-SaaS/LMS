import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[90%] sm:w-[450px] text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-blue-500">
          <FontAwesomeIcon icon={faClock} className="w-10 h-10 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Coming Soon
        </h1>

        {/* Animated Text */}
        <p className="text-gray-500 text-lg mb-8 animate-bounce">
          We’re working hard to launch this feature.
        </p>

        {/* Progress-like animation */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <div className="h-2 bg-blue-500 animate-[loading_2s_ease-in-out_infinite]" />
        </div>

        {/* Button */}
        <Link to={"/admin/dashboard"}
          className="btn bg-sky-800 hover:bg-sky-600 border-none w-full flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Footer small text */}
      <p className="mt-6 text-gray-400 text-sm">
        © 2025 ACTS — All rights reserved.
      </p>

      {/* Custom Keyframes */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default ComingSoon;
