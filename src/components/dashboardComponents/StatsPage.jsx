import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const StatsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin-stats").then((res) => setStats(res.data));
  }, [axiosSecure]);

  if (!stats) return <div className="text-center mt-20">Loading stats...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h2>

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Revenue"
          value={`৳${stats.revenue}`}
          icon={<CurrencyDollarIcon className="h-8 w-8 text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders}
          icon={<ShoppingBagIcon className="h-8 w-8 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Total Products"
          value={stats.products}
          icon={<CubeIcon className="h-8 w-8 text-purple-600" />}
          color="bg-purple-100"
        />
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<UsersIcon className="h-8 w-8 text-orange-600" />}
          color="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Bar Chart: Daily Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6">Revenue Trend (Daily)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.orderStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dailyRevenue" fill="#3B82F6" name="Revenue (৳)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Pie Chart: Product Categories */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6">Products by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Cards
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-4 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

export default StatsPage;
