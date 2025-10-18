// src/data/mockData.ts

export const keyMetricsData = [
  {
    title: "Active Users",
    value: "1,234",
    change: "+15%",
    changeType: "positive",
  },
  {
    title: "Subscription Growth",
    value: "99.9%",
    change: null, // No change indicator in the image
    changeType: null,
  },
  {
    title: "System Performance",
    value: "$12,345",
    change: "+12%", // Inferred from image, as it's below the User Activity chart
    changeType: "positive",
  },
  {
    title: "Revenue", // Title for the last card, inferred from its position. The image shows the value 12,345 for System Performance and a +12% for User Activity. I'll adjust the data structure slightly for clarity.
    value: "$12,345",
    change: null,
    changeType: null,
  },
];


export const userActivityChartData = [
  { name: 'Day 1', uv: 3000,   },
  { name: 'Day 2', uv: 1500 ,  },
  { name: 'Day 3', uv: 2000,   },
  { name: 'Day 4', activity: 2000 },
  { name: 'Day 5', activity: 4500 },
  { name: 'Day 6', activity: 2500 },
  { name: 'Day 7', activity: 5000 },
];

export const systemStatusData = [
  { label: "System Uptime", value: 98.5 },
  { label: "Server Load", value: 68 },
];

// src/data/subscriptionData.ts

export interface Subscription {
  id: string;
  user: string;
  plan: 'Basic' | 'Standard' | 'Premium';
  status: 'Active' | 'Cancelled' | 'Expired';
  renewalDate: string; // YYYY-MM-DD format for easier sorting/display
}

export const mockSubscriptions: Subscription[] = [
  { id: 'SUB001', user: 'Sophia Clark', plan: 'Premium', status: 'Active', renewalDate: '2024-12-21' },
  { id: 'SUB002', user: 'Ethan Bennett', plan: 'Basic', status: 'Active', renewalDate: '2024-11-15' },
  { id: 'SUB003', user: 'Olivia Carter', plan: 'Standard', status: 'Cancelled', renewalDate: '2025-01-30' },
  { id: 'SUB004', user: 'Liam Davis', plan: 'Premium', status: 'Active', renewalDate: '2024-10-02' },
  { id: 'SUB005', user: 'Ava Evans', plan: 'Basic', status: 'Expired', renewalDate: '2024-09-10' },
];

export const subscriptionPlans = ['Basic', 'Standard', 'Premium'];
export const subscriptionUsers = ['Sophia Clark', 'Ethan Bennett', 'Olivia Carter', 'Liam Davis', 'Ava Evans', 'New User A', 'New User B'];
export const subscriptionStatuses = ['Active', 'Cancelled', 'Expired'];

// src/data/tenantData.ts

export interface Tenant {
  id: string;
  name: string;
  subscriptionType: 'Basic' | 'Standard' | 'Premium';
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  status: 'Active' | 'Inactive';
}

export const mockTenants: Tenant[] = [
  { id: 'T001', name: 'Maplewood High', subscriptionType: 'Premium', startDate: '2023-09-01', endDate: '2024-08-31', status: 'Active' },
  { id: 'T002', name: 'Oakridge University', subscriptionType: 'Standard', startDate: '2024-01-15', endDate: '2025-01-14', status: 'Active' },
  { id: 'T003', name: 'Pinecrest Academy', subscriptionType: 'Basic', startDate: '2024-03-01', endDate: '2025-02-28', status: 'Inactive' },
  { id: 'T004', name: 'Riverdale College', subscriptionType: 'Premium', startDate: '2023-08-01', endDate: '2024-07-31', status: 'Active' },
  { id: 'T005', name: 'Willowbrook School', subscriptionType: 'Standard', startDate: '2024-05-20', endDate: '2025-05-19', status: 'Inactive' },
];

export const subscriptionTypes = ['Basic', 'Standard', 'Premium'];

// src/data/userData.ts

export interface User {
  id: string;
  name: string;
  email: string;
  tenantName: string; // The school or university this user belongs to
}

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Alice Johnson',
    email: 'alice.j@maplewood.edu',
    tenantName: 'Maplewood High',
  },
  {
    id: 'U002',
    name: 'Robert Smith',
    email: 'robert.s@oakridge.edu',
    tenantName: 'Oakridge University',
  },
  {
    id: 'U003',
    name: 'Clara Davies',
    email: 'clara.d@pinecrest.org',
    tenantName: 'Pinecrest Academy',
  },
  {
    id: 'U004',
    name: 'David Wilson',
    email: 'david.w@riverdale.edu',
    tenantName: 'Riverdale College',
  },
  {
    id: 'U005',
    name: 'Emily Brown',
    email: 'emily.b@willowbrook.net',
    tenantName: 'Willowbrook School',
  },
  {
    id: 'U006',
    name: 'George Harris',
    email: 'george.h@maplewood.edu',
    tenantName: 'Maplewood High', // Another user from the same tenant
  },
  {
    id: 'U007',
    name: 'Fiona Lee',
    email: 'fiona.l@oakridge.edu',
    tenantName: 'Oakridge University',
  },
];

export interface Message {
  id: number;
  tenantName: string;
  address: string;
  messageType: "Technical Issue" | "Complaint" | "Other";
  lastMessage: string;
  daysAgo: string;
  avatar: string;
}

export const mockMessages: Message[] = [
  {
    id: 1,
    tenantName: "Jane Smith",
    address: "123 Main St",
    messageType: "Technical Issue",
    lastMessage: "Hi John, my kitchen faucet is leaking...",
    daysAgo: "2 days ago",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    tenantName: "Michael Brown",
    address: "456 Oak Ave",
    messageType: "Complaint",
    lastMessage: "The neighbors are being too loud again...",
    daysAgo: "5 days ago",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    tenantName: "Emily White",
    address: "789 Pine Rd",
    messageType: "Other",
    lastMessage: "Just a heads up, I'll be out of town...",
    daysAgo: "1 week ago",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    tenantName: "David Green",
    address: "22 Elm St",
    messageType: "Complaint",
    lastMessage: "The heating isn’t working properly.",
    daysAgo: "3 days ago",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    tenantName: "Sophia Clark",
    address: "77 Maple Ave",
    messageType: "Technical Issue",
    lastMessage: "Wi-Fi is down in my unit again.",
    daysAgo: "4 days ago",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    tenantName: "Ethan Wilson",
    address: "5 Lake Rd",
    messageType: "Other",
    lastMessage: "Can you confirm my payment was received?",
    daysAgo: "6 days ago",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    tenantName: "Olivia Johnson",
    address: "15 Birch Ln",
    messageType: "Complaint",
    lastMessage: "The trash hasn’t been collected.",
    daysAgo: "2 weeks ago",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 8,
    tenantName: "Daniel Lee",
    address: "63 Willow St",
    messageType: "Technical Issue",
    lastMessage: "Air conditioner making loud noise.",
    daysAgo: "1 day ago",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 9,
    tenantName: "Emma Davis",
    address: "92 Cedar Rd",
    messageType: "Other",
    lastMessage: "Could I schedule a maintenance check?",
    daysAgo: "1 week ago",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    tenantName: "Lucas Miller",
    address: "101 Pine Ave",
    messageType: "Complaint",
    lastMessage: "There’s a leak under my sink again.",
    daysAgo: "3 days ago",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];