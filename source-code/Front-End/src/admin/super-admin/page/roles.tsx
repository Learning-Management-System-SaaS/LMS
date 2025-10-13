import React, { useState } from "react";
import RolesList from "../components/rolesList";
import RolesForm from "../components/rolesForm";

const RolesPage = () => {
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
    {state&&(<RolesForm onCancel={oncancel} onSubmit={onsubmit} />)}
    {!state&&<RolesList
      onEdit={onEdit}
      onNewTenant={onNewTenant}
      onViewDetails={onViewDetails}
    />}
    </div>
  )
}

export default RolesPage


