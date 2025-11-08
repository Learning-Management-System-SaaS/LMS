import DetailsCard from "../common/detailsCard";
import { useLocation } from "react-router-dom";

const TenantDetails = () => {
  const location = useLocation()
  const tenant = location.state.tenant
  const tenantData = {...tenant}

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
