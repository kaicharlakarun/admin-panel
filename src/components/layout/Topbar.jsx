import React from "react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      {/* left - menu + search */}
      <div className="flex items-center gap-3">
        {/* hamburger only on mobile */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 w-48 sm:w-72">
          <span className="text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* right icons */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm">
          🇬🇧
        </button>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200">
          🛒
        </button>
        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200">
          🔔
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            2
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-blue-500 text-xs font-semibold text-white flex items-center justify-center">
            MA
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
