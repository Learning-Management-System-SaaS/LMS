import React from "react";
import DetailsCard from "../common/detailsCard";

const TenantDetails = () => {
  const tenantData = {
    tenantName: "Riverdale High School",
    subscriptionType: "Premium Tier",
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    status: "Active",
  };

  const sections = [
    {
      title: "Tenant Information",
      fields: [
        { label: "Tenant Name", name: "tenantName" },
        { label: "Subscription Type", name: "subscriptionType" },
      ],
    },
    {
      title: "Subscription Details",
      fields: [
        { label: "Start Date", name: "startDate", type: "date" },
        { label: "End Date", name: "endDate", type: "date" },
        { label: "Status", name: "status" },
      ],
    },
  ];

  const handleSave = (values: Record<string, string>) => {
    console.log("Updated Data:", values);
  };

  return (
    
      <DetailsCard
        title="Tenant Details"
        description="View and manage tenant and subscription information."
        sections={sections}
        initialValues={tenantData}
        onSubmit={handleSave}
      />
   
  );
};

export default TenantDetails;
