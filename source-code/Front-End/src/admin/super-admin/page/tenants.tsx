import React, { useState } from "react";
import CreateTenantForm from "../components/tenenatForm";
import TenantList from "../components/tenantList";

const TenantsPage = () => {
  const[state,setState]=useState(false)
  const onsubmit =()=>{}
  const oncancel =()=>{}
  const onNewTenant = () => {
    setState(prev=>!prev)
  };
  const onViewDetails = (id: string) => {
    console.log(id);
  };
  const onEdit = (id: string) => {
    console.log(id);
  };
  return (
    <div className="px-8 py-8 bg-gray-50 min-h-screen overflow-y-auto">
    {state&&(<CreateTenantForm onCancel={oncancel} onSubmit={onsubmit} />)}
    {!state&&<TenantList
      onEdit={onEdit}
      onNewTenant={onNewTenant}
      onViewDetails={onViewDetails}
    />}
    </div>
  );
};

export default TenantsPage;
