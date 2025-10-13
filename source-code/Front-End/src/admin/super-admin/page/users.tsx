import React, { useState } from "react";
import UserForm from "../components/userForm";
import UserList from "../components/userList";

const UsersPage = () => {
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
    {state&&(<UserForm onCancel={oncancel} onSubmit={onsubmit} />)}
    {!state&&<UserList
      onEdit={onEdit}
      onNewTenant={onNewTenant}
      onViewDetails={onViewDetails}
    />}
    </div>
  )
}

export default UsersPage



