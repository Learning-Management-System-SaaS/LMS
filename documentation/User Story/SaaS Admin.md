SaaS Administrator 

# Manage Role 

> User Story: As a SaaS Administrator, I want to manage roles (Create, Edit and delete) to control access level based on different responsibility,
              only assigns high level roles for each tenant, so that tenants can access and manage their tenant hierarchy. 
> Acceptance Criteria 

1- Create Role Record 
- SaaS administrator can “Create” new role record. 
- System requires mandatory fields (Name). 
- System validates role name is unique. 
- System validates mandatory fields and displays an error message if misses or incorrect format occurs. 
- When submitted, system adds new record to roles. 
- System prompts a message “Rols added successfully”. 
- Role became available for assignment in system. 
- System redirects to roles list. 
 

2-View Role List 
- SaaS administrator can view roles list.
- List columns are (Name, Description, Actions) 
- Each list record contains actions (Edit, Details, Add Permissions, delete). 

 
3- Edit Role Record 
- SaaS administrator can “Edit” an existing record in roles list.
- System displays role’s existing information in editable form. 
- SaaS administrator can change fields (Name, description). 
- System validates mandatory fields and displays an error if misses or incorrect format occur. 
- When submitted successfully, system saves changes and updates role’s record. 
- System prompts message “Role updated successfully”. 
- Existing users with the role, automatically inherits updated information and permissions. 
- System redirects to roles list. 
 

4- Details Role Record 

- SaaS administrator can select a role from list to view its “Details”. 
- System displays existing information in locked fields. 


5- Delete Role Record 

- SaaS administrator can “Delete” role from roles list. 
- System prompts a message “Are you sure you want to delete this role?”. 
- When confirmed, then system deletes role record. 
- System reloads new role list. 

 
6- Add permissions 

- SaaS administrator can “add permissions” to existing roles in role list. 
- System displays all permissions in a role permissions form. 
- SaaS can select all permissions related to the role. 
- SaaS can deselect permissions assigned to the role. 
- When submitted, system saves all selected permissions to that role. 
- System prompts a message “permissions added to the role successfully”. 
- System reloads roles list. 

 

#Manage Permission 

> User Story: As a SaaS Administrator, I want to manage permissions (Create, Edit, Delete), so that I can control which actions and features are available to
              different roles int he system. 
> Acceptance Criteria 

1- View Permission List 
- SaaS administrator can view permissions list. 
- List columns are (Name, Permission Name) 
- Each list record contains actions (Edit, Details, Delete). 

 
2- Create Permission Record 

- SaaS administrator can “Create” a new permission. 
- System requires mandatory fields (Name, URL). 
- System validates permission name uniqueness and displays error message if permission name already exists. 
- System validates mandatory fields and display error message if misses or incorrect format occurs. 
- When submitted successfully, system added new record to permissions. 
- System prompts message “Permissions added successfully”. 
- System redirects to Permissions List. 

 

3- Edit Permission Record 

- SaaS administrator can “Edit” an existing permission from list. 
- System displays permission’s existing information in editable form. 
- SaaS can change mandatory fields (Name, URL).  
- System validates permission name uniqueness and displays error message if permission name already exists. 
- System validates mandatory fields and display error message if misses or incorrect format occurs. 
- When submitted successfully, system saves changes and update record. 
- System prompts message “Permissions updated successfully”. 
- All roles inherit this permission become updated. 
- System redirects to Permissions List. 

 
4- Details Permission Details 

- SaaS administrator can select an existing permission to view its “Details”. 
- System displays existing information in locked fields. 


5- Delete Permission Record 

- SaaS administrator can “Delete” permission from list. 
- System prompts a message “Are you sure you want to delete this permission?”. 
- When confirmed, then system deletes permission record. 
- All roles inherit this permission become disabled. 
- System reloads new role list. 

 

# Manage Tenant 

> User Story: As a SaaS Administrator, I want to manage tenant record (Create, Edit, Delete) so that I can onboard new clients. 
> Description:  
    - The SaaS Administrator needs the ability to onboard new tenant organizations, which involves setting up their accounts, assigning initial settings,
      and ensuring they have access to all necessary features of the LMS. This feature will also allow for the management of existing tenants,
      including updating their information, monitoring their usage, and addressing any issues related to their accounts. 

> Acceptance Criteria: 

1- Create Tenant Record 

- SaaS Administrator can open a “Tenant Form”. 
- The form requires mandatory fields (Tenant Name, Location details) 
- The system validates mandatory fields and displays an error message if missing or incorrect format occurred. 
- When submitted successfully, tenant status is immediately active and date is current date, then record is added to the system 
- An email is sent to the primary contact of new the tenant, when account is created or updated, containing necessary credentials to access their system. 
- A success message prompted “Tenant Record is added successfully”. 
- System redirects to tenant list. 


2- View Tenant List 

- SaaS Administrator can view a list of Tenant  
- The list columns contain (Tenant Name, Status, Location and actions). 
- Each List’s record has different actions (Edit, Details, Delete). 

 
3- Edit Tenant Record 

- SaaS Administration can "Edit" an existing tenant from the tenant list. 
- The system displays tenant’s existing information in editable form (Tenant Name, Location Information, Status). 
- CreatedAt field is a locked field. 
- SaaS Administrator can change any non-locked fields. 
- Tenant status can be (deactivate, Suspend, activate). 
- System validates required fields, displays an error message if missing or incorrect format occurred. 
- When submitted form successfully, system saves changes and update tenant’s record. 
- System prompts a message “Tenant record updated successfully”. 
- System redirects to Tenant list. 


4- Delete Tenant Record 

- SaaS Admins can “delete” an existing tenant’s record from tenant list 
- System prompts a confirmation message “Are you sure you want to delete this tenant?” 
- Only if confirmed, the tenant record is permanently deleted from tenant list. 
- System prompts a message “Tenant removed successfully” 
- System reloads new tenant list. 


5- View Detail Tenant Record 

- SaaS Administrator can select a tenant from tenant list to view its “details”. 
- System displays all existing tenant’s information in locked field 


# Manage User Account 

> User Story: As a SaaS administrator, I want to manage user account (Create, Edit and Delete), 
              So that I can assign high level roles, then users will be able to access and manage their tenant. 

> Acceptance Criteria: 

1- Create User Account Record 

- SaaS administrator can “create” a new user account. 
- System requires mandatory fields (Tenant, FirstName, LastName, Email, Password). 
- System displays default option “Organization Administrator" for mandatory field role. 
- System validates mandatory fields and displays an error message if incorrect format or misses a mandatory field. 
- When submitted successfully, then record is added to the system. 
- System prompts a message “User Account Added Successfully”. 

 

2- View User Account List 

- SaaS Administrator can “view” users Accounts list. 
- A list contains columns (Full Name, Tenant, Role, Actions). 
- Each list record contains actions (Edit, Details, Delete). 


3- Edit User Account Record 

- SaaS Administrator can “Edit” an existing record from user account list. 
- System displays an existing user account’s information in an editable form. 
- System requires mandatory fields (Tenant, FirstName, LastName, Email, password). 
- System validates mandatory fields and displays an error message if missing or incorrect format occur. 
- When submitted successfully, a message prompts “User Account Updated Successfully”. 
- System redirects to User Account List. 

 
4- Details User Account Record 

- SaaS administrator can select user account to view its “Details”. 
- System displays existing user account information in locked fields. 

 
5- Delete User Account Record 

- SaaS administrator can “Delete” an existing record from user account list. 
- System prompts message “Are you sure you want to permanently delete this record?”. 
- Once confirmed, then system delete the record from system. 
- System prompts a message “Tenant removed successfully”. 
- System reloads new user account list 

 

# Manage Subscription 

> User Story: As a SaaS Administrator, I want to manage tenants' subscription (create, edit, delete), so that I can control which tenant have active access to
             LMS system according to their plan and billing cycle.  

> Acceptance Criteria: 

1- Create Subscription Record 

- SaaS administrator can create a “subscription form”. 
- System requires mandatory fields (Tenant, plan-type, billing cycle, start-date) 
- System validates that tenant does not have an already active subscription. 
- System calculates end-Date, based on billing cycle and start-date, then displays result in a locked field.  
- System calculates cost based on plan’s price, then displays result in a locked field. 
- System validates all mandatory fields and displays an error message if misses a mandatory field. 
- When submitted successfully, system sets status to active and added a new record. 
- System prompts a success message “Tenant’s Subscription added successfully”. 
- System redirects to subscription list. 
- System takes immediate effect based on plan-type. 

 

2-View Subscription List 

- SaaS administrator can view subscription list (Tenant, plan-type, Status, Actions). 
- Each list record has actions (Edit, Details, Delete). 

 

3- Edit Subscription Record 

- SaaS administrator can “Edit” an existing tenant’s subscription record. 
- System displays tenant’s subscription existing information in editable form. 
- System requires mandatory fields (Tenant, plan-type, billing cycle, start-date, status). 
- SaaS administrator can change tenant, status, Plan-type, Bill cycle and Start date. 
- System calculates end date and cost and displays results in locked fields. 
- Status field can be (Trail, Active, cancel). 
- System validates and can displays an error message if a mandatory field is missing.  
- When submitted successfully, system saves changes and update record. 
- System prompts a message “Tenant’s subscription updated successfully”. 
- System redirects to Subscription list. 

 

4-Detail Subscription Record 

- SaaS administrator can select tenant’s subscription details from list. 
- System displays subscription existing information in locked fields. 

 

5-Delete Subscription Record 

- SaaS administrator can “Delete” a tenant’s subscriptions from the list. 
- System displays a prompt “Are you sure want to delete this tenant’s subscription?” 
- Once confirmed, system prompts “Tenant’s name subscription deleted successfully”. 
- System reloads new subscription list. 

 
