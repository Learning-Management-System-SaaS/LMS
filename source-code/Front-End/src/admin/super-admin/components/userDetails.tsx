// src/pages/UserDetails.tsx

import React from 'react';
import { mockUsers } from '../../../data/mockData'; // Assuming data is imported

interface UserDetailsProps {
  userId?: string;
  onEdit?: (id: string) => void;
  onBack?: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, onEdit, onBack }) => {
  // Find the user, using Olivia Rhye's data as the example match
  const user = mockUsers.find(u => u.id === userId) || mockUsers.find(u => u.name === 'Olivia Rhye');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-error">User Not Found</h1>
        <p className="mt-4 text-gray-600">Could not load details for user ID: {userId}</p>
        <button className="btn btn-primary mt-6" onClick={onBack}>Back to Users</button>
      </div>
    );
  }

  // Split name for the display layout
  const [firstName, lastName] = user.name.split(' ');
  // Use a hardcoded password display to match the strict design
  const passwordDisplay = '••••••••••'; 

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Header (Matching CloudApp design) */}
      <div className="navbar bg-white shadow-sm border-b border-gray-200 px-6 py-3 mb-8 rounded-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold text-gray-800 normal-case">CloudApp</a>
        </div>
        <div className="flex-none space-x-6 text-gray-600 font-medium">
          <a href="#" className="link link-hover">Dashboard</a>
          <a href="#" className="link link-hover">Subscriptions</a>
          <a href="#" className="link link-hover text-primary font-bold">Users</a> {/* Highlighted as current page */}
          <a href="#" className="link link-hover">Reports</a>
          <a href="#" className="link link-hover">Settings</a>
        </div>
      </div>

      {/* Title and Description */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">User Details</h1>
      <p className="text-gray-500 mb-8">View and manage user account information for {user.name}.</p>

      {/* Details Card Container (Centered and constrained width) */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-3xl mx-auto">
        
        {/* Detail Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          
          {/* Row 1: Tenant (Full Width) */}
          <div className="col-span-2">
            <div className="text-sm font-medium text-gray-500 mb-1">Tenant</div>
            <div className="text-lg font-normal text-gray-800">{user.tenantName}</div>
          </div>
          
          {/* Row 2: First Name & Last Name */}
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">First Name</div>
            <div className="text-lg font-normal text-gray-800">{firstName}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Last Name</div>
            <div className="text-lg font-normal text-gray-800">{lastName}</div>
          </div>

          {/* Row 3: Email (Full Width) */}
          <div className="col-span-2">
            <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
            <div className="text-lg font-normal text-gray-800">{user.email}</div>
          </div>

          {/* Row 4: Password (Full Width with Link) */}
          <div className="col-span-2 flex items-baseline space-x-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Password</div>
              <div className="text-lg font-normal text-gray-800">{passwordDisplay}</div>
            </div>
            {/* Reset Password Link (Strictly matching the blue link style) */}
            <button type="button" className="btn btn-link btn-sm text-blue-500 normal-case p-0 h-auto min-h-0 text-sm">
              Reset Password
            </button>
          </div>
        </div>

        {/* Action Buttons (Strictly matching placement and style) */}
        <div className="flex justify-end pt-10 mt-8 border-t border-gray-100">
          <button type="button" className="btn btn-ghost normal-case text-gray-600 mr-4" onClick={onBack}>
            Back
          </button>
          <button 
            type="button" 
            className="btn btn-info text-white normal-case"
            // onClick={() => onEdit(user.id)}
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;