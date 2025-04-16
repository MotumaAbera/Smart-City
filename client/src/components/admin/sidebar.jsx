import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Building,
  UserPlus,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Place logo at the top of the sidebar
  // You can replace the SVG below with an <img src="/path/to/logo.png" /> if you add a real logo file
  const Logo = () => (
    <div className="flex items-center justify-center py-6">
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#e11d27" stroke="#191919" strokeWidth="2" />
        <text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">BS</text>
      </svg>
      <span className="ml-2 text-xl font-bold text-primary">Boku Shanan</span>
    </div>
  );

  const menuItems = [
    { 
      path: "/admin", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: "/admin/documents", 
      label: "Documents", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: "/admin/population", 
      label: "Population", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: "/admin/investments", 
      label: "Investments", 
      icon: <Building className="h-5 w-5" /> 
    },
    { 
      path: "/admin/employees", 
      label: "Employees", 
      icon: <UserPlus className="h-5 w-5" /> 
    }
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logoutMutation.mutate();
    }
  };

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <Logo />
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <div className="font-bold text-lg">Boku Shanan</div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white ml-auto"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
            >
              <a className={`flex items-center py-2 px-3 rounded-md transition duration-150 ease-in-out ${
                location === item.path 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}>
                <div className="mr-3">{item.icon}</div>
                {!collapsed && <span>{item.label}</span>}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        {collapsed ? (
          <div className="flex flex-col space-y-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              className="justify-start text-gray-400 hover:text-white"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Button 
              variant="ghost"
              className="justify-start text-gray-400 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
