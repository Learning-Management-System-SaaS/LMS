import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  
} from "recharts";

const data = [
  { day: "Day 1", users: 100 },
  { day: "Day 5", users: 230 },
  { day: "Day 10", users: 180 },
  { day: "Day 15", users: 300 },
  { day: "Day 20", users: 150 },
  { day: "Day 25", users: 270 },
  { day: "Day 30", users: 250 },
];

const UserActivityChart: React.FC = () => {
  return (
    <div className="card bg-white shadow-md w-full max-w-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">User Activity</h2>
          <p className="text-sm text-gray-400">Last 30 Days</p>
        </div>
        <span className="text-green-500 font-semibold text-sm">+12%</span>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C6FB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#005BEA" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              labelStyle={{ color: "#6b7280" }}
            />

            {/* Filled Line */}
            <Area
              type="monotone"
              dataKey="users"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#06b6d4" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserActivityChart;
