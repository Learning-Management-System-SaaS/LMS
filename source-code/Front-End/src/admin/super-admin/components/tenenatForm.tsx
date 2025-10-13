// src/pages/CreateTenantForm.tsx

import React, { useState } from 'react';
import { subscriptionTypes } from '../../../data/mockData';

interface CreateTenantFormProps {
  onSubmit: (data: { name: string; subscriptionType: string }) => void;
  onCancel: () => void;
}

const CreateTenantForm: React.FC<CreateTenantFormProps> = ({ onSubmit, onCancel }) => {
  const [tenantName, setTenantName] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: tenantName, subscriptionType });
  };

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Form Card Container (Centered and constrained width) */}
      
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
        {/* Title and Description */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Tenant</h1>
        <p className="text-gray-500 mb-8">Enter the details for the new school or university.</p>
        <form onSubmit={handleSubmit}>
          {/* Tenant Name */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Tenant Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="e.g. Springfield University"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
            />
          </div>

          {/* Subscription Type */}
          <div className="form-control mb-8">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Subscription Type</span>
            </label>
            <select
              className="select select-bordered w-full bg-white text-gray-800"
              value={subscriptionType}
              onChange={(e) => setSubscriptionType(e.target.value)}
              required
            >
              <option value="" disabled>Select a subscription type</option>
              {subscriptionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Action Button (Aligned right) */}
          <div className="flex justify-end">
            <button type="submit" className="btn btn-info text-white normal-case text-base rounded-md">
              Create Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTenantForm;