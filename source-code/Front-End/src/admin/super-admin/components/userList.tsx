// src/pages/TenantList.tsx
import { mockUsers } from "../../../data/mockData";
import Table from "../common/table";



const UserList: React.FC = () => {
 
  return(
    <Table 
      title="Users"
      data={mockUsers}
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
  )
 
};

export default UserList