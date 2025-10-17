// src/pages/CreateUserForm.tsx

import React, { useState } from 'react';
import { mockTenants } from '../../../data/mockData'; // Import tenant data for the dropdown



const UserForm: React.FC = () => {
  const [tenantId, setTenantId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onsubmit =(prop:{})=>{console.log(prop)}
  const oncancel =()=>{}
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onsubmit({ tenantId, firstName, lastName, email, password });
    // Optionally reset form fields after submission
    setTenantId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container  mx-auto px-4 py-8">
      {/* Page Title and Description */}
      <div className='text-center'>
        <h1 className="text-3xl  font-bold text-gray-800 mb-2">Create a New User Account</h1>
      <p className="text-gray-500 mb-8">Fill in the details below to create a new user.</p>
      </div>

      {/* Form Card Container (Centered and constrained width) */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Tenant Dropdown */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Tenant</span>
            </label>
            <select
              className="select select-bordered w-full bg-white border-gray-400 text-gray-800"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              required
            >
              <option value="" disabled>Select Tenant</option>
              {mockTenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>

          {/* First Name & Last Name (Side by Side) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-gray-700 font-medium">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-white border-gray-400 w-full text-gray-800"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-white border-gray-400 w-full text-gray-800"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered bg-white border-gray-400 w-full text-gray-800"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control mb-8">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered bg-white border-gray-400 w-full text-gray-800"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button type="submit" className="btn bg-sky-800 border-none hover:bg-sky-700 text-white normal-case text-base rounded-md w-full">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;