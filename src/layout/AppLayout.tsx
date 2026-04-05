import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { HeaderProvider } from "../context/HeaderContext";

const LayoutContent = () => {
  return (
    <>
      <div>
        <AppSidebar />
      </div>
      <div>
        <AppHeader />
      </div>
      <div className="p-6 md:ml-64">
        <Outlet />
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
