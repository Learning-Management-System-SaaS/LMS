// src/pages/TenantList.tsx
import { useState } from "react";
import { Tenant, mockTenants } from "../../../data/mockData";
import Table from "../common/table";
import FilterSort from "../common/filterSort";

interface TenantListProps {
  onNewTenant?: () => void;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TenantList: React.FC<TenantListProps> = () => {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);

  return (
    <div>
      <Table
        data={mockTenants}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "subscriptionType", label: "Type" },
          { key: "status", label: "Status" },
          { key: "startDate", label: "Start Date" },
          { key: "endDate", label: "End Date" },
        ]}
        action={true}
        title="Tenants"
        searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.name.toLowerCase().includes(term.toLowerCase())
        }
      />
    </div>
  );
};

export default TenantList;
