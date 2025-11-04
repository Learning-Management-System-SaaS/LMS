// src/pages/TenantList.tsx
import { mockTenants } from "../../../data/mockData";
import Table from "../common/table";
import { useNavigate } from "react-router-dom";

interface TenantListProps {
  onNewTenant?: () => void;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TenantList: React.FC<TenantListProps> = () => {
  const navigate = useNavigate();
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
        haveExport={true}
        haveFilter={true}
        filterFactors={['active','inactive','premium','standard','basic']}
        onRowClick={(item) =>
          navigate(`tenantDetails/${item.id}`, { state: { tenant: item.id } })
        }
        searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.name.toLowerCase().includes(term.toLowerCase())
        }
      />
    </div>
  );
};

export default TenantList;
