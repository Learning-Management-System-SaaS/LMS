// src/components/SystemStatus.tsx

import React from 'react';
import { systemStatusData } from '../../../data/mockData';

const SystemStatus: React.FC = () => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
      {systemStatusData.map((item, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={item.value}
            max="100"
          ></progress>
        </div>
      ))}
    </div>
  );
};

export default SystemStatus;