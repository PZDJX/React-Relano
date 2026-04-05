import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext"; // Fixed path
import { Users, User, Settings, LogIn, Home } from "lucide-react"; // Icons

const AppSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      {!isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        id="top-bar-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <Link to="/" className="flex items-center p-2.5 mb-5">
            <img
              className="h-6 w-6 mr-3"
              src="/vite.svg"
              alt="RNLAct Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              RNLAct
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white group dark:hover:bg-gray-700">
                <Home className="w-5 h-5 mr-3" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/genders" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white group dark:hover:bg-gray-700">
                <Users className="w-5 h-5 mr-3" />
                <span className="ms-3">Genders</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white group dark:hover:bg-gray-700">
                <User className="w-5 h-5 mr-3" />
                <span className="ms-3">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/properties" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white group dark:hover:bg-gray-700">
                <Settings className="w-5 h-5 mr-3" />
                <span className="ms-3">Properties</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white group dark:hover:bg-gray-700">
                <LogIn className="w-5 h-5 mr-3" />
                <span className="ms-3">Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
