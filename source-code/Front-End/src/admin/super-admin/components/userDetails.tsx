// src/pages/UserDetails.tsx

import React from 'react';
import { mockUsers } from '../../../data/mockData'; // Assuming data is imported
import { useLocation } from 'react-router-dom';
import DetailsCard from '../common/detailsCard';

interface UserDetailsProps {
  userId?: string;
  onEdit?: (id: string) => void;
  onBack?: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ onEdit, onBack }) => {
 const location = useLocation()
 const userId = location.state.user
 const user = mockUsers.find(user=>user.id === userId)

  const sections = [
    {
      title: "User Information",
      fields:[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Tenant Name", name: "tenantName" },
      ],
    },
  ];

  const handleSave = (values: Record<string, string>) => {
    console.log("Updated Data:", values);
  };

  const userData = {...user};
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-error">User Not Found</h1>
        <p className="mt-4 text-gray-600">Could not load details for user ID: {userId}</p>
        <button className="btn btn-primary mt-6" onClick={onBack}>Back to Users</button>
      </div>
    );
  }

  return (
    
      <DetailsCard
        title="Tenant Details"
        description="View and manage tenant and subscription information."
        sections={sections}
        initialValues={userData}
        onSubmit={handleSave}
      />
   
  );
};

export default UserDetails;

// [
//         { label: "Tenant Name", name: "tenantName" },
//         { label: "Subscription Type", name: "subscriptionType" },
//       ]