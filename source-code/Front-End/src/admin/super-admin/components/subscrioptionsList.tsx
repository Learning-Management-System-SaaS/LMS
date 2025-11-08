// src/pages/ManageSubscriptions.tsx
import { useNavigate } from "react-router-dom";
import { mockSubscriptions } from "../../../data/mockData";
import Table from "../common/table";

const SubscriptionsList= () => {
  const navigate = useNavigate()
  return (
    <div>
      <Table
        data={mockSubscriptions}
        columns={[
          { key: "id", label: "Subscription ID" },
          { key: "user", label: "User" },
          { key: "plan", label: "Plan" },
          { key: "status", label: "Status" },
          { key: "renewalDate", label: "Renewal Date" },
        ]}
        haveExport={true}
        haveFilter={true}
        haveSort={true}
        action={true}
        filterFactors={['active','cancelled','expired']}
        onRowClick={(item=>navigate(`subscriptionDetails/${item.id}`,{state:{subscription:item.id}}))}
        title="`Subscriptions"
        searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.user.toLowerCase().includes(term.toLowerCase())
        }
      />
    </div>
  );
};

export default SubscriptionsList;
