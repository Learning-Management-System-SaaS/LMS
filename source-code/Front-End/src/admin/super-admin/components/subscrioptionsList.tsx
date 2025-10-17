// src/pages/ManageSubscriptions.tsx

import React, { useState } from "react";
import DeleteModal from "../common/deleteModal";
import { Subscription, mockSubscriptions } from "../../../data/mockData";
import Table from "../common/table";
// Assuming DeleteSubscriptionModal is imported from components



// NOTE: In a real app, you would pass subscriptions as a prop.
// For this strict regeneration, we'll use mock data and manage state internally.

const SubscriptionsList= () => {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subToDeleteId, setSubToDeleteId] = useState<string | null>(null);

  // --- Filtering and Pagination Logic (Strictly based on Image 1) ---
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // As suggested by "Showing 1 to 5 of 10 results" in the image
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = filteredSubscriptions.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const currentSubscriptions = filteredSubscriptions.slice(
    startIndex,
    endIndex
  );

  // --- Utility Functions ---
  const getStatusBadgeClass = (status: Subscription["status"]) => {
    // Mapping colors strictly from the image
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-600 border border-blue-200"; // Light Blue/Cyan look
      case "Cancelled":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200"; // Yellow/Orange look
      case "Expired":
        return "bg-red-100 text-red-600 border border-red-200"; // Light Red/Pink look
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubToDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
// Propagate delete action if needed
    setIsModalOpen(false);
    setSubToDeleteId(null);
  };

  return (
    <div>
      <Table
        data={mockSubscriptions}
        columns={[
          { key: "id", label: "Subscription ID" },
          { key: "user", label: "User" },
          { key: "plan", label: "Plan" },
          { key: "status", label: "Status" },
          { key: "renewalDate", label: "Renewal Date" },
        ]}
        action={true}
        title="Manage Subscriptions"
        searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.user.toLowerCase().includes(term.toLowerCase())
        }
      />
    </div>
  );
};

export default SubscriptionsList;
