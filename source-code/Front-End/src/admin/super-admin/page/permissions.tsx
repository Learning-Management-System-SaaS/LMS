import ComingSoon from "../../../pages/comingSoon";
import Breadcrumbs from "../common/breadcrumbs";
import { Outlet, useLocation } from "react-router-dom";
const PermissionsPage = () => {
  const location = useLocation();
  const pages = location.pathname.split("/");
  return (
    // <div className="px-8 py-8 bg-gray-50 min-h-screen overflow-y-auto">
    //   <Breadcrumbs pages={pages} />
    //   <Outlet />
    // </div>
    <ComingSoon />
  );
};

export default PermissionsPage;
