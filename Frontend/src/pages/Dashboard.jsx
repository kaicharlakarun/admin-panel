import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500">Welcome back</p>
            <h2 className="text-xl font-semibold">
              Mathew Anderson!
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Today's Sales</p>
              <p className="text-2xl font-semibold">$2,763</p>
              <p className="text-xs text-emerald-500 mt-1">↑ 2.3%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">
                Overall Performance
              </p>
              <p className="text-2xl font-semibold">39%</p>
              <p className="text-xs text-emerald-500 mt-1">↑ 1.8%</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center justify-center">
          <span className="text-7xl">👨‍💼</span>
        </div>
      </section>

      {/* Cards grid */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Revenue Updates</h3>
          <p className="text-xs text-slate-500 mb-4">
            Overview of Profit
          </p>
          <div className="h-32 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            Chart placeholder
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Sales Overview</h3>
          <p className="text-xs text-slate-500 mb-4">Every Month</p>
          <div className="flex items-center justify-center">
            <div className="h-28 w-28 rounded-full border-[10px] border-blue-500 border-t-slate-200 flex items-center justify-center font-semibold text-xs">
              $800,325
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Weekly Stats</h3>
          <p className="text-xs text-slate-500 mb-4">Average Sales</p>
          <div className="h-32 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            Area chart
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Yearly Sales</h3>
          <div className="h-32 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            Bar chart
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Payment Gateways</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between">
              <span>PayPal</span>
              <span className="font-medium">+$7,852</span>
            </li>
            <li className="flex justify-between">
              <span>Wallet</span>
              <span className="font-medium">+$3,250</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-2">Monthly Earnings</h3>
          <div className="h-32 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            Line chart
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
