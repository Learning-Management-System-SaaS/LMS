// src/App.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../super-admin/common/sideBar';

import { Icons } from '../../data/icons';

const TenantAdmin = () => {
    const navItems = [
      { id:1,name: "Dashboard", icon:Icons.dashboard, active: false },
      { id:2,name: "Users", icon: Icons.users, active: false },
      { id:3,name: "Subscriptions", icon: Icons.subscription, active: false },
      { id:4,name: "Divisions", icon: Icons.tenants, active: false },
      { id:5,name: "Permissions", icon: Icons.permission, active: false },
      { id:6,name: "Roles", icon: Icons.roles, active: false },
      { id:7,name: "Messages", icon: Icons.messages, active: false },
      { id:8,name: "Support", icon: Icons.supports, active: false },
      { id:9,name: "Settings", icon: Icons.settings, active: false },
    ];
    const PanelFor = {title:"Tenant Panle",navList:navItems}
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 hidden lg:block flex-shrink-0">
        <Sidebar title={PanelFor.title} navList={PanelFor.navList} />
      </div>
       {/* Main Content Area */}
       <div className="flex-grow  overflow-y-auto">
        {/* <div className='lg:hidden mb-6'><Navbar /></div> */}
        <Outlet />
       </div>
      
    </div>
  );
};

export default TenantAdmin;