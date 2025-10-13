import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt,
  faUser,
  faExclamationCircle,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Support: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50  min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm breadcrumbs text-gray-500">
          <span>Support</span> / <span>Ticket #12345</span>
        </p>
        <h1 className="text-3xl font-semibold mt-2">Issue with payment processing</h1>
        <p className="text-sm text-gray-400 mt-1">
          Submitted by <span className="font-medium text-gray-600">Alex Bennett</span> on July 26, 2024
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2 space-y-6">
          {/* Description */}
          <div className="card border border-gray-400 shadow-lg">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2 text-gray-700">
                <FontAwesomeIcon icon={faClipboardList} /> Description
              </h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                I’m experiencing issues with payment processing. When I try to subscribe
                to the premium plan, the payment fails. I’ve tried multiple payment
                methods, but none seem to work. Please assist me in resolving this issue
                as soon as possible.
              </p>
            </div>
          </div>

          {/* Agent Notes */}
          <div className="card  shadow-lg">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2 text-gray-700">
                <FontAwesomeIcon icon={faUser} /> Agent Notes
              </h2>

              {/* Existing Note */}
              <div className=" border border-gray-400 p-4 rounded-xl mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Support Agent</span>
                  <span className="text-xs text-gray-400">July 27, 2024</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Thank you for reaching out, Alex. We're looking into the issue with your
                  payment processing. We'll update you as soon as we have a resolution.
                </p>
              </div>

              {/* Add Note */}
              <textarea
                placeholder="Add a note..."
                className="textarea textarea-bordered mt-4 bg-transparent border-gray-400 w-full resize-none"
                rows={3}
              ></textarea>
              <button className="btn btn-primary mt-2 w-fit">Post Note</button>
            </div>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="space-y-6">
          <div className="card  shadow-sm">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2 text-gray-700">
                <FontAwesomeIcon icon={faTicketAlt} /> Details
              </h2>
              <ul className="text-sm mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Ticket ID:</span> #12345
                </li>
                <li>
                  <span className="font-semibold">Requester:</span> Alex Bennett
                  <br />
                  <span className="text-gray-500 text-xs">alex.bennett@example.com</span>
                </li>
                <li>
                  <span className="font-semibold">Priority:</span>{" "}
                  <span className="badge badge-error text-white">High</span>
                </li>
                <li>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="badge badge-success text-white">Open</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="card  shadow-sm">
            <div className="card-body space-y-2">
              <h2 className="card-title flex items-center gap-2 text-gray-700">
                <FontAwesomeIcon icon={faExclamationCircle} /> Actions
              </h2>
              <button className="btn btn-info btn-sm w-full">Assign to Agent</button>
              <button className="btn bg-sky-600 btn-sm w-full">Update Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
