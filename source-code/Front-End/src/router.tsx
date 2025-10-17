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
import UserForm from "./admin/super-admin/components/userForm";
import UserList from "./admin/super-admin/components/userList";
import TenantList from "./admin/super-admin/components/tenantList";
import TenantForm from "./admin/super-admin/components/tenenatForm";
import RolesForm from "./admin/super-admin/components/rolesForm";
import SubscriptionsList from "./admin/super-admin/components/subscrioptionsList";
import SubscriptionForm from "./admin/super-admin/components/subscriptionForm";
import PermissionsList from "./admin/super-admin/components/permissionList";
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
        children:[
          {
            index: true,
            element:<SubscriptionsList />
          },
          {
            path:"newTenant",
            element:<SubscriptionForm />
          }
        ]
      },
      {
        path: "users",
        element: <UsersPage />,
        children:[
          {
            index: true,
            element:<UserList />
          },
          {
            path:"newUser",
            element:<UserForm/>
          }
        ]

      },
      {
        path: "tenants",
        element: <TenantsPage />,
        children:[
          {
            index: true,
            element:<TenantList />
          },
          {
            path:"newTenant",
            element:<TenantForm />
          }
        ]
      },
      {
        path: "permissions",
        element: <PermissionsPage />,
        children:[
          {
            index: true,
            element:<PermissionsList />
          },
          {
            path:"newTenant",
            // element:<PermissionsForm />
          }
        ]
      },
      {
        path: "roles",
        element: <RolesPage />,
        children:[
          {
            index: true,
            element:<TenantList />
          },
          {
            path:"newRole",
            // element:<RolesForm />
          }
        ]
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
