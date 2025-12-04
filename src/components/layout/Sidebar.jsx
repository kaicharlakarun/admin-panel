import React from "react";

const menuItemsTop = [
  "Dashboard",
  "Sales",
  "Product",
  "Promotions",
  "Analytics",
  "Reports",
];

const menuItemsBottom = ["Privacy", "Settings"];

const Sidebar = () => {
  return (
    <aside className="h-full w-64 flex flex-col bg-slate-950 text-slate-100 px-5 py-6 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-2xl bg-blue-500 flex items-center justify-center font-bold text-lg">
          e
        </div>
        <span className="text-xl font-semibold">eMart</span>
      </div>

      <div className="text-xs uppercase tracking-wide text-slate-400">
        Admin Tools
      </div>

      {/* Top menu */}
      <nav className="flex flex-col gap-1">
        {menuItemsTop.map((item, i) => (
          <button
            key={item}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition 
              ${i === 0
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-200 hover:bg-slate-800/70"}`}
          >
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
          Configuration
        </div>
        <nav className="flex flex-col gap-1">
          {menuItemsBottom.map((item) => (
            <button
              key={item}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/70"
            >
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              {item}
            </button>
          ))}
        </nav>
      </div>

      <button className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/70">
        ⏻ Log out
      </button>
    </aside>
  );
};

export default Sidebar;
