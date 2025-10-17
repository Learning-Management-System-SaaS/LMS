import React, { useState } from "react";
import CreateTenantForm from "../components/tenenatForm";
import TenantList from "../components/tenantList";
import { Tenant } from "../../../data/mockData";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "../common/breadcrumbs";

const TenantsPage = () => {
 
  const location =useLocation()
   const pages = location.pathname.split("/")
  return (
    <div className="px-8 py-8 bg-gray-50 min-h-screen overflow-y-auto">
      <Breadcrumbs  pages ={pages}/>
      <Outlet />
    </div>
  );
};

export default TenantsPage;
