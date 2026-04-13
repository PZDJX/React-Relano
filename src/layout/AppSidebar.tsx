import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { Home, Users, User, Settings, LogOut } from "lucide-react";

const AppSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const sidebarItems = [
    { path: '/', text: 'Dashboard', icon: Home },
    { path: '/genders', text: 'Genders', icon: Users },
    { path: '/users', text: 'Users', icon: User },
    { path: '/settings', text: 'Settings', icon: Settings },
    { path: '/login', text: 'Login', icon: LogOut },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        id="logo-sidebar"
        className={`fixed left-0 top-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 ${
          isOpen ? 'translate-x-0' : ''
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon className="w-5 h-5 text-inherit" />
                  <span className="ms-3">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;

