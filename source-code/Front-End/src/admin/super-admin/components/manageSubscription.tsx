// src/pages/ManageSubscriptions.tsx

import React, { useState } from 'react';
import { Subscription,mockSubscriptions } from '../../../data/mockData';
// Assuming DeleteSubscriptionModal is imported from components

interface ManageSubscriptionsProps {
  onAddSubscription: () => void;
  onDeleteSubscription: (subscriptionId: string) => void;
  // Use mock data directly in this component for a self-contained example
}

// NOTE: In a real app, you would pass subscriptions as a prop.
// For this strict regeneration, we'll use mock data and manage state internally.

const ManageSubscriptions: React.FC<ManageSubscriptionsProps> = ({
  onAddSubscription,
  onDeleteSubscription: parentDeleteSubscription, // Renamed to avoid confusion
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subToDeleteId, setSubToDeleteId] = useState<string | null>(null);

  // --- Filtering and Pagination Logic (Strictly based on Image 1) ---
  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // As suggested by "Showing 1 to 5 of 10 results" in the image
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = filteredSubscriptions.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

  // --- Utility Functions ---
  const getStatusBadgeClass = (status: Subscription['status']) => {
    // Mapping colors strictly from the image
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-600 border border-blue-200'; // Light Blue/Cyan look
      case 'Cancelled':
        return 'bg-yellow-100 text-yellow-600 border border-yellow-200'; // Yellow/Orange look
      case 'Expired':
        return 'bg-red-100 text-red-600 border border-red-200'; // Light Red/Pink look
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubToDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    parentDeleteSubscription(id); // Propagate delete action if needed
    setIsModalOpen(false);
    setSubToDeleteId(null);
  };

  return (
    <div className="container mx-auto bg-gray-50 min-h-screen">
      
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Subscriptions</h1>
        <button 
          className="btn btn-info text-white normal-case text-base rounded-md" // Adjusted to match the cyan button color
          onClick={onAddSubscription}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Subscription
        </button>
      </div>

      {/* Search, Filter, Sort Bar */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Search Input (Wider input with an icon inside) */}
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            className="input input-bordered w-full bg-white pl-10 text-gray-700"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.448 4.39l3.411 3.411a1 1 0 01-1.414 1.414l-3.411-3.411A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Filter and Sort Buttons (Icon only, text aligned) */}
        <div className="flex space-x-2 text-gray-500 font-medium">
          <button className="btn bg-transparent text-gray-600 border-0 shadow-none normal-case text-sm px-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707L16 10.586V15l-3 3v-5.414L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          <button className="btn normal-case text-sm px-3 bg-transparent border-0 shadow-none text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort
          </button>
        </div>
      </div>

      {/* Subscription Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Header (Strict uppercase and gray background) */}
            <thead className="bg-gray-50">
              <tr>
                <th className="text-xs font-semibold text-gray-500 uppercase py-3 px-6 w-[15%]">SUBSCRIPTION ID</th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-[20%]">USER</th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-[15%]">PLAN</th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-[15%]">STATUS</th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-[20%]">RENEWAL DATE</th>
                <th className="text-xs font-semibold text-gray-500 uppercase w-[15%] text-center">ACTIONS</th>
              </tr>
            </thead>
            
            {/* Table Body (Normal rows, no zebra striping in the image) */}
            <tbody>
              {currentSubscriptions.length > 0 ? (
                currentSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">{sub.id}</td>
                    <td className="text-sm text-gray-800">{sub.user}</td>
                    <td className="text-sm text-gray-800">{sub.plan}</td>
                    <td>
                      <div className={`badge text-xs font-bold px-3 py-1 rounded-full ${getStatusBadgeClass(sub.status)}`}>
                        {sub.status}
                      </div>
                    </td>
                    <td className="text-sm text-gray-800">{sub.renewalDate}</td>
                    <td className="text-center">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {/* Delete Button (Red icon/hover) */}
                        <button
                          className="btn btn-ghost btn-sm p-1 rounded hover:bg-red-50 text-red-500"
                          onClick={() => handleDeleteClick(sub.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No subscriptions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer (Pagination and result count) */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white rounded-b-lg">
          <span className="text-sm text-gray-600">
            Showing {Math.min(startIndex + 1, totalResults)} to {endIndex} of {totalResults} results
          </span>
          <div className="flex space-x-2">
            <button
              className="btn btn-ghost btn-sm normal-case text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-ghost btn-sm normal-case text-gray-600 hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal (Placeholder) */}
      {/* <DeleteSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        subscriptionToDelete={subToDeleteId}
      /> */}
    </div>
  );
};

export default ManageSubscriptions;