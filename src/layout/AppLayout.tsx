import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { HeaderProvider } from "../context/HeaderContext";

const LayoutContent = () => {
  return (
    <>
      <AppSidebar />
      <AppHeader />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <HeaderProvider>
        <LayoutContent />
      </HeaderProvider>
    </SidebarProvider>
  );
};

export default AppLayout;

