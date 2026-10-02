import { useState } from "react";

export default function AdminHome() {
  const [active, setActive] = useState("home");

  const menu = [
    { id: "home", label: "Home Feed", icon: "🏠" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "orders", label: "Orders", icon: "🛒" },
    { id: "supplies", label: "Supplies", icon: "🚚" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1e3a] text-white p-4 flex flex-col">
        <div className="mb-8 p-2">
          <h1 className="font-bold">Admin Portal</h1>
          <p className="text-xs text-gray-400">3 Angels Water Station</p>
        </div>
        {menu.map(m => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`text-left p-3 rounded mb-2 ${active===m.id ? "bg-blue-600" : "hover:bg-blue-900"}`}
          >
            {m.icon} {m.label}
          </button>
        ))}
        <div className="mt-auto">
          <button className="p-3 text-left">Support</button>
          <button className="p-3 text-left">Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {active === "home" && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Home Feed</h1>
            <p className="text-gray-500 mb-6">Good morning, Administrator</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <p className="text-sm">Add User | Provision new account | Generate Report</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold mb-4">Recent Activity</h3>
                <p className="text-sm">• Database backup completed - System - 10 mins ago</p>
                <p className="text-sm">• Failed login attempt - Unknown IP - 45 mins ago</p>
              </div>
            </div>
          </div>
        )}

        {active === "inventory" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Inventory - 3 Angels Water</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded text-center"><b>205</b><br/>Total Gallons</div>
              <div className="bg-yellow-50 p-4 rounded text-center"><b>1</b><br/>Low Stock</div>
              <div className="bg-green-50 p-4 rounded text-center"><b>2</b><br/>In Stock</div>
            </div>
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr><th className="p-3 border text-left">Item</th><th className="p-3 border">Stock</th><th className="p-3 border">Status</th></tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border">Round Gallon (5gal)</td><td className="p-3 border text-center">120</td><td className="p-3 border text-center text-green-600">In Stock</td></tr>
                <tr><td className="p-3 border">Slim Gallon</td><td className="p-3 border text-center">85</td><td className="p-3 border text-center text-green-600">In Stock</td></tr>
                <tr><td className="p-3 border">Water Caps / Seals</td><td className="p-3 border text-center">12</td><td className="p-3 border text-center text-red-600">Low Stock</td></tr>
                <tr><td className="p-3 border">Water Dispenser</td><td className="p-3 border text-center">8</td><td className="p-3 border text-center text-green-600">In Stock</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {active !== "home" && active !== "inventory" && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold">{active.toUpperCase()}</h2>
            <p className="text-gray-500 mt-2">This page is coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}