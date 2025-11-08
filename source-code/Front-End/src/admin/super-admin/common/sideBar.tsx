import UserProfileCard from '../components/UserProfileCard'; // We'll create this next
import {Link } from "react-router-dom"
import { ReactElement } from "react";

interface navList{
  id:number,
  name:String,
  icon:any,
  active:boolean
}
interface SideBarProps{
  title:String,
  navList:navList[]
}
const Sidebar = ({title,navList}:SideBarProps):ReactElement => {
  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Admin Panel Header */}
      <div className="p-6 text-xl font-bold text-gray-800 border-b border-gray-200">
        {title}
      </div>

      {/* Navigation Menu */}
      <ul className="menu w-full space-y-2 p-4 flex-grow">
        {navList.map((item) => (
          <li key={item.id}>
            <Link to={item.name.toLocaleLowerCase()}
              
              className={`flex items-center px-4 py- rounded-lg text-gray-700 hover:bg-sky-400 ${
                item.active ? 'bg-sky-400 text-primary font-semibold' : ''
              }`}
            >
              
              <span className="text-lg mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Profile Card */}
      <div className="p-4 border-t border-gray-200">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default Sidebar;