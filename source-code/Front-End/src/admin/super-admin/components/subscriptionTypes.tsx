// src/components/SubscriptionTypes.tsx

import React from 'react';

const SubscriptionTypes: React.FC = () => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-6 h-80 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Types</h3>
        <p className="text-sm text-gray-500 mb-4">
          Overview of your active subscriptions.
        </p>
      </div>
      <div className="flex justify-around items-end text-sm text-gray-600 font-medium">
        <span>Basic</span>
        <span>Premium</span>
        <span>Enterprise</span>
      </div>
    </div>
  );
};

export default SubscriptionTypes;