// src/components/KeyMetrics.tsx

import React from 'react';
import { keyMetricsData } from '../../../data/mockData';

const KeyMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {keyMetricsData.map((metric, index) => (
        <div key={index} className="card bg-white shadow-md rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.title}</h3>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            {metric.change && (
              <span
                className={`text-sm font-semibold ${
                  metric.changeType === "positive" ? "text-success" : "text-error"
                }`}
              >
                {metric.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;