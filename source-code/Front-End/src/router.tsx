import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import SuperAdmin from "./admin/super-admin/main";
import AdminDashboard from "./admin/super-admin/page/dashboard";
import SubscriptionPage from "./admin/super-admin/page/subscription";
import SettingsPage from "./admin/super-admin/page/settings";
import UsersPage from "./admin/super-admin/page/users";
import PermissionsPage from "./admin/super-admin/page/permissions";
import TenantsPage from "./admin/super-admin/page/tenants";
import RolesPage from "./admin/super-admin/page/roles";
import Messages from "./admin/super-admin/page/messages";
import Support from "./admin/super-admin/page/support";
import NotFound from "./pages/notFound";
import ComingSoon from "./pages/comingSoon";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <SuperAdmin />,
    children: [
      {
        index:true,
        element:<Navigate to={'dashboard'} replace/>
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tenants",
        element: <TenantsPage />,
      },
      {
        path: "permissions",
        element: <PermissionsPage />,
      },
      {
        path: "roles",
        element: <RolesPage />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "settings",
        element: <ComingSoon />,
        // element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
