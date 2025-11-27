import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, FileText, UserPlus, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const menuItems = [
    {
      path: "/adminDashboard",
      label: "Enquiry Form Data",
      icon: LayoutDashboard,
    },
    {
      path: "/sdatForm",
      label: "S.DAT Form Data",
      icon: FileText,
    },
    {
      path: "/registration",
      label: "Admission Form Data",
      icon: UserPlus,
      matchPaths: ["/registration/basicDetailsForm", "/registration/educationalDetailsForm"],
    },
  ];

  const isActive = (item) => {
    if (item.matchPaths) {
      return item.matchPaths.some(path => location.pathname.includes(path)) || location.pathname.includes(item.path);
    }
    return location.pathname === item.path;
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              active
                ? "bg-white text-[#c61d23] shadow-md"
                : "text-white hover:bg-white/10"
            } ${mobile ? "w-full" : "lg:rounded-l-full lg:rounded-r-none lg:ml-auto lg:w-5/6"}`}
          >
            <Icon size={20} className="flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#c61d23] to-[#a01818] shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#c61d23] font-bold text-lg">SD</span>
            </div>
            <span className="text-white font-semibold">Student Panel</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[72px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-40 bg-gradient-to-b from-[#c61d23] to-[#a01818] shadow-xl transition-all duration-300 ${
          isMobileMenuOpen ? "top-[72px] opacity-100" : "-top-full opacity-0"
        }`}
      >
        <div className="p-4 space-y-2">
          <NavLinks mobile={true} />
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col justify-between h-screen bg-gradient-to-b from-[#c61d23] to-[#a01818] shadow-xl">
        {/* Logo and Navigation */}
        <div className="flex flex-col pt-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-8 px-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#c61d23] font-bold text-2xl">SD</span>
            </div>
            <span className="text-white font-semibold text-center">Student Panel</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 px-4">
            <NavLinks />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;