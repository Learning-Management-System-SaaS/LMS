import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Message, mockMessages } from "../../../data/mockData";



const getBadgeColor = (type: Message["messageType"]) => {
  switch (type) {
    case "Technical Issue":
      return "badge badge-warning text-white";
    case "Complaint":
      return "badge badge-error text-white";
    default:
      return "badge badge-success text-white";
  }
};

const MessageTable: React.FC = () => {
  return (
    <div className="p-6 bg-base-100 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <button className="btn btn-info text-white">+ New Message</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Tenant Name</th>
              <th>Message Type</th>
              <th>Last Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockMessages.map((msg) => (
              <tr key={msg.id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img src={msg.avatar} alt={msg.tenantName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{msg.tenantName}</div>
                      <div className="text-sm text-gray-500">{msg.address}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={getBadgeColor(msg.messageType)}>
                    {msg.messageType}
                  </span>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span>{msg.lastMessage}</span>
                    <span className="text-xs text-gray-400">{msg.daysAgo}</span>
                  </div>
                </td>
                <td className="flex gap-3">
                  <button className="btn btn-ghost btn-sm text-info">
                    <FontAwesomeIcon icon={faCommentDots} />
                  </button>
                  <button className="btn btn-ghost btn-sm text-error">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>Showing 1 to 10 of 15 results</span>
        <div className="join">
          <button className="join-item btn btn-sm">Previous</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MessageTable;
