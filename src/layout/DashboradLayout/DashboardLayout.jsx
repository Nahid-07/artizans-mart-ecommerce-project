import { Sidebar } from "../../components/dashboardComponents/Sidebar";
import { Outlet } from "react-router";

export const DashboardLayout = () => {
  return (
    <div className="flex gap-5">
      <aside className="">
        <Sidebar />
      </aside>
      <aside className="flex-1 bg-gray-50">
        <Outlet></Outlet>
      </aside>
    </div>
  );
};
