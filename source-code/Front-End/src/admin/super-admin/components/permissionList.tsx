import { mockTenants } from "../../../data/mockData";
import Table from "../common/table";

const PermissionsList: React.FC = () => {
  return (
    <div>
      <Table
        title="Users"
        // data={mockPermission}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Last Name" },
          { key: "email", label: "Email" },
          { key: "tenantName", label: "Tenant" },
        ]}
        action={true}
        searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.name.toLowerCase().includes(term.toLowerCase())
        }
      />
    </div>
  );
};

export default PermissionsList;
