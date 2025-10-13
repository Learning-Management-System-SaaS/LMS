import React, { useState } from 'react'
import PermissionList from '../components/permissionList'
import PermissionForm from "../components/permissionForm"
import ManagePermissions from '../components/managePermission'
const PermissionsPage = () => {
  const[state,setState]=useState(false)
  const[edit,setEdit]=useState(false)
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
    {state&&(<PermissionForm onCancel={oncancel} onSubmit={onsubmit} />)}
    {edit&&(<ManagePermissions/>)}
    {!state&&<PermissionList
      onEdit={onEdit}
      onNewTenant={onNewTenant}
      onViewDetails={onViewDetails}
    />}
    </div>
  )
}

export default PermissionsPage