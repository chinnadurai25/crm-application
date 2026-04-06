import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '../../utils/cn';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fix position and size */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 min-h-screen",
          isSidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />

        <main className="flex-1 mt-20 p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        <footer className="py-6 px-8 text-center text-slate-400 text-xs border-t border-slate-100">
          &copy; 2026 FlyTowards CRM. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
