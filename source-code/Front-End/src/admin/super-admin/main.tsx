// src/App.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/sideBar';
import Navbar from './components/navBar';

const SuperAdmin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>
       {/* Main Content Area */}
       <div className="flex-grow  overflow-y-auto">
        <div className='lg:hidden mb-6'><Navbar /></div>
        <Outlet />
       </div>
      
    </div>
  );
};

export default SuperAdmin;