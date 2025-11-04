import { mockSubscriptions } from "../../../data/mockData";
import DetailsCard from "../common/detailsCard";
import { useLocation } from "react-router-dom";

const SubscriptionDetails = () => {
  const location = useLocation()
  const subscriptionId = location.state.subscription 
  const subscription = mockSubscriptions.find(item => item.id === subscriptionId)
  const SubscriptionData = {...subscription}
console.log(subscription)
  const sections = [
    {
      title: "Subscription Information",
      fields: [
        { label: "Tenant Admin", name: "user" },
        { label: "Subscription Type", name: "plan" },
        { label: "Renewal Date", name: "renewalDate" },
        {label:"Status", name:"status"}
    
      ],
    },
    // {
    //   title: "Features",
    //   fields: [
    //     { label: "Start Date", name: "startDate", type: "date" },
    //     { label: "End Date", name: "endDate", type: "date" },
    //     { label: "Status", name: "status" },
    //   ],
    // },
  ];

  const handleSave = (values: Record<string, string>) => {
    console.log("Updated Data:", values);
  };

  return (
    
      <DetailsCard
        title="Subscription Details"
        description="View and manage subscription information."
        sections={sections}
        initialValues={SubscriptionData}
        onSubmit={handleSave}
      />
   
  );
};

export default SubscriptionDetails;
