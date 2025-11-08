// src/pages/TenantList.tsx
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../../data/mockData";
import Table from "../common/table";



const UserList: React.FC = () => {
 const navigate = useNavigate()
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
      haveExport={true}
      onRowClick={(item)=>navigate(`userDetails/${item.id}`, { state: { user: item.id} })}
      searchFn={(item, term) =>
          item.id.toLowerCase().includes(term.toLowerCase()) ||
          item.name.toLowerCase().includes(term.toLowerCase())
        }
    />
  )
 
};

export default UserList