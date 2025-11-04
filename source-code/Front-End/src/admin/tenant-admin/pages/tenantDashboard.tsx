import React from "react";
import KeyMetrics from "../../super-admin/components/keyMetrics";
import UserActivityChart from '../../super-admin/components/UserActivityChart';
import SubscriptionTypes from '../../super-admin/components/SubscriptionTypes';
import SystemStatus from '../../super-admin/components/SystemStatus';

const TenantDashboard = () => {
  return (
    <div className="container mx-auto px-8 py-8 bg-gray-50 min-h-screen">

        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">
              Welcome Sosan, here's an overview of your system.
            </p>
          </div>
          <button className="btn btn-primary">+ Add Widget</button>
        </div>

        {/* Key Metrics Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Key Metrics
        </h2>
        <KeyMetrics />

        {/* Charts and Subscription Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <UserActivityChart />
          <SubscriptionTypes />
        </div>

        {/* System Status */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          System Status
        </h2>
        <SystemStatus />
      
    </div>
  );
};

export default TenantDashboard;
