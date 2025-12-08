import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Home,
  Users,
  Box,
  ClipboardList,
  BarChart3,
  Flag,
  Mail,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <aside className="h-full w-64 flex flex-col bg-slate-950 text-slate-100 px-5 py-6 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
       
        <span className="text-xl font-semibold">Whatnot Store</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 text-sm">
        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <Home size={18} />
          <span>Dashboard</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <Users size={18} />
          <span>Users</span>
        </button>

        {/* Products with dropdown */}
        <div>
          <button
            onClick={() => setOpenProducts((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 hover:bg-slate-800/70"
          >
            <div className="flex items-center gap-3">
              <Box size={18} />
              <span>Products</span>
            </div>
            {openProducts ? (
              <ChevronDown size={16} className="text-slate-400" />
            ) : (
              <ChevronRight size={16} className="text-slate-400" />
            )}
          </button>

          {openProducts && (
            <div className="ml-9 flex flex-col gap-1 text-xs text-slate-300 mt-1">
              <button className="text-left px-2 py-1 hover:text-white" onClick={Navigate("/brands")}>
              <Link
            to="/brands"
         className="text-left px-2 py-1 hover:text-white"
>
          Brands
        </Link>
              </button>
             <button className="text-left px-2 py-1 bg-slate-900 rounded-md text-white" onClick={Navigate("/categories")}> 
                <Link
             to="/brands"
          className="text-left px-2 py-1 hover:text-white"
            >
            Categories
              </Link>
              </button>
              <button className="text-left px-2 py-1 hover:text-white" onClick={Navigate("/products")}>
                Products
                <Link
            to="/brands"
       className="text-left px-2 py-1 hover:text-white"
>
  Brands
</Link>
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <ClipboardList size={18} />
          <span>Orders</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <BarChart3 size={18} />
          <span>Ledgers</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <Flag size={18} />
          <span>Banners</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <Mail size={18} />
          <span>Messages</span>
        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
          <Bell size={18} />
          <span>Notifications</span>
        </button>

        {/* Settings dropdown */}
        <div>
          <button
            onClick={() => setOpenSettings((b) => !b)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 hover:bg-slate-800/70"
          >
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span>Settings</span>
            </div>
            {openSettings ? (
              <ChevronDown size={16} className="text-slate-400" />
            ) : (
              <ChevronRight size={16} className="text-slate-400" />
            )}
          </button>

          {openSettings && (
            <div className="ml-9 flex flex-col gap-1 text-xs text-slate-300 mt-1">
              <button className="text-left px-2 py-1 hover:text-white">
                Terms & Conditions
              </button>
              <button className="text-left px-2 py-1 hover:text-white">
                Privacy Policy
              </button>
              <button className="text-left px-2 py-1 hover:text-white">
                FAQs
              </button>
            </div>
          )}
        </div>
      </nav>

      
    </aside>
  );
};

export default Sidebar;
