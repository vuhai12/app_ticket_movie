import HeaderAdmin from "@components/HeaderAdmin";
import SidebarAdmin from "@components/SidebarAdmin";
import { ReactNode } from "react";

const LayoutDashboardAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-[30px]">
      <SidebarAdmin />
      <div className="min-w-0 px-[30px] pb-[50px]">
        <HeaderAdmin />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboardAdmin;
