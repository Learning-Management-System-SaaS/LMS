// src/pages/AddSubscriptionForm.tsx

import React, { useState } from 'react';
import { subscriptionPlans,subscriptionUsers } from '../../../data/mockData';

interface AddSubscriptionFormProps {
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    plan: '',
    user: '',
    startDate: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Subscription</h2>
      <p className="text-gray-500 mb-8">Fill in the details below to create a new subscription.</p>

      <form onSubmit={handleSubmit}>
        {/* Plan Selection */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Plan</span>
          </label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="select select-bordered bg-white w-full"
            required
          >
            <option value="" disabled>Select a plan</option>
            {subscriptionPlans.map((plan) => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
        </div>

        {/* User Selection */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">User</span>
          </label>
          <select
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="select select-bordered bg-white border w-full"
            required
          >
            <option value="" disabled>Select a user</option>
            {subscriptionUsers.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="mm/dd/yyyy"
            required
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Information</h3>

        {/* Card Number */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Card Number</span>
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="**** **** **** ****"
            maxLength={19} // 16 digits + 3 spaces
            required
          />
        </div>

        {/* Expiry Date & CVV */}
        <div className="flex gap-4 mb-6">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="input input-bordered w-full bg-white"
              placeholder="MM / YY"
              maxLength={7}
              required
            />
          </div>
          <div className="form-control w-24"> {/* Adjusted width for CVV */}
            <label className="label">
              <span className="label-text">CVV</span>
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="input input-bordered w-full bg-white"
              placeholder="***"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Cancel
          </button>
          <button type="submit" className="btn bg-sky-500 hover:bg-sky-600 border-0 text-white">
            Create Subscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscriptionForm;