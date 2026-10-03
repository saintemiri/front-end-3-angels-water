import HomeFeed from "./HomeFeed.jsx";
import SuppliesSection from "./SuppliesSection.jsx";
import SettingsSection from "./SettingsSection.jsx";
import OrdersSection from "./order/OrdersSection.jsx";
import React from "react";
import {
  Home, Package, ShoppingCart, Truck, Users, BarChart2, Settings,
  LifeBuoy, LogOut, Search, Bell, Grid3x3, ArrowUpRight, ArrowDownRight,
  ShieldCheck, Pencil
} from "lucide-react";
import {
  BarChart, Bar, XAxis, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const navItems = [
  { icon: Home, label: "Home Feed" },
  { icon: Package, label: "Inventory" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Truck, label: "Supplies" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const statCards = [
  { icon: Users, label: "Total Active Users Today", value: "60", delta: "+125 vs yesterday", up: true },
  { icon: BarChart2, label: "Active Sessions", value: "53", delta: "+5% vs yesterday", up: true },
  { icon: "₱", label: "Revenue", value: "₱1,250", delta: "-10% vs yesterday", up: false },
  { icon: ShieldCheck, label: "System Health", value: "99.9%", delta: "All systems operational", up: true, neutral: true },
];

const dailyPerformance = [
  { day: "01 Jun", actual: 55, target: 70 },
  { day: "02 Jun", actual: 40, target: 60 },
  { day: "03 Jun", actual: 78, target: 65 },
  { day: "04 Jun", actual: 62, target: 72 },
  { day: "05 Jun", actual: 82, target: 68 },
];

const orderDistribution = [
  { name: "Actual", value: 60 },
  { name: "Target", value: 40 },
];

export default function MetricsDashboard({ initialView = "Analytics" }) {
  const [range, setRange] = React.useState("Today");
  const [view, setView] = React.useState(initialView);
  const [panel, setPanel] = React.useState(null);
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: 'Sarah Jenkins',
    team: 'Core Systems',
    role: 'Administrator',
    status: 'Online',
  });
  const [notifications, setNotifications] = React.useState([
    { title: 'Water delivery scheduled', detail: 'Route 04 is due in 25 minutes.', time: '2m ago', accent: 'bg-[#1755F5]' },
    { title: 'Inventory alert', detail: 'Caps are below the safety threshold.', time: '18m ago', accent: 'bg-[#F59E0B]' },
    { title: 'New staff login', detail: 'Ava James logged into the dispatch portal.', time: '1h ago', accent: 'bg-[#10B981]' },
  ]);

  const saveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <div className="flex h-screen w-full bg-[#EEF1F6] font-sans text-[#1B2130]">
      <aside className="flex w-60 flex-shrink-0 flex-col justify-between bg-[#101C36] text-[#C7CEDD]">
        <div>
          <div className="flex items-center gap-3 px-5 py-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#101C36]">A</div>
            <div>
              <p className="text-sm font-medium text-white">Admin Portal</p>
              <p className="text-[11px] text-[#8890A6]">3 Angels Water Station</p>
            </div>
          </div>
          <nav className="mt-2 flex flex-col gap-1 px-3">
            {navItems.map(({ icon: Icon, label }) => (
              <button key={label} onClick={() => setView(label)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${view === label? "bg-[#1755F5] text-white" : "text-[#AEB6C9] hover:bg-white/5 hover:text-white"}`}>
                <Icon size={17} strokeWidth={1.8} /> {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-1 border-t border-white/10 px-3 py-4">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#AEB6C9] hover:bg-white/5 hover:text-white"><LifeBuoy size={17} /> Support</button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#AEB6C9] hover:bg-white/5 hover:text-white"><LogOut size={17} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="relative flex items-center justify-between border-b border-[#E3E7EF] bg-white px-8 py-4">
          <h1 className="text-[15px] font-semibold">{view}</h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 rounded-lg bg-[#F3F5F9] px-3 py-2 text-sm text-[#8890A6]"><Search size={15} /><span>Search...</span></div>

            <button
              type="button"
              onClick={() => setPanel(panel === 'notifications' ? null : 'notifications')}
              className="relative rounded-full p-2 text-[#8890A6] transition hover:bg-[#F3F5F9] hover:text-[#1755F5]"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#E14D4D]" />
            </button>

            <button
              type="button"
              onClick={() => setPanel(panel === 'profile' ? null : 'profile')}
              className="flex items-center gap-2 rounded-full border border-[#E3E7EF] bg-[#F7F9FC] px-2 py-1.5 text-left transition hover:border-[#C9D7F5] hover:bg-[#F0F5FF]"
              aria-label="Profile"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#D9DEE8] to-[#CDD9F6]" />
              <span className="text-sm text-[#4B5468]">Profile</span>
            </button>
          </div>

          {panel && (
            <div className="absolute right-8 top-[calc(100%+12px)] z-20 w-[320px] rounded-2xl border border-[#E3E7EF] bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
              {panel === 'notifications' ? (
                <div>
                  <div className="mb-3 flex items-center justify-between px-2 pt-1">
                    <h3 className="text-sm font-semibold text-[#1B2130]">Notifications</h3>
                    <button type="button" onClick={handleMarkAllRead} className="text-[11px] font-medium text-[#1755F5]">
                      Mark all read
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D5DCE9] bg-[#F9FAFC] px-4 py-8 text-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF4FF] text-lg text-[#1755F5]">✓</div>
                      <p className="text-sm font-semibold text-[#1B2130]">You&apos;re all caught up</p>
                      <p className="mt-1 text-[11px] text-[#6B7280]">No unread notifications.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="flex items-start gap-3 rounded-xl border border-[#EEF0F4] bg-[#F9FAFC] p-2.5">
                          <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${item.accent}`} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-[#1B2130]">{item.title}</p>
                            <p className="mt-1 text-[11px] leading-5 text-[#5F6F8C]">{item.detail}</p>
                          </div>
                          <span className="mt-0.5 text-[10px] text-[#8890A6]">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-3 flex items-center justify-between px-2 pt-1">
                    <h3 className="text-sm font-semibold text-[#1B2130]">Profile</h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile((value) => !value)}
                      className="text-[11px] font-medium text-[#1755F5]"
                    >
                      {isEditingProfile ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-xl border border-[#EEF0F4] bg-[#F9FAFC] p-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#9AC4FF] to-[#7C8DFF]" />
                        <input
                          value={profile.name}
                          onChange={(e) => setProfile((current) => ({ ...current, name: e.target.value }))}
                          className="w-full rounded-lg border border-[#D9E3F4] bg-white px-3 py-2 text-sm font-semibold text-[#1B2130] outline-none ring-0 placeholder:text-[#8E9AB1]"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="space-y-2 text-[12px] text-[#4E5D7A]">
                        <div className="flex items-center justify-between rounded-lg bg-[#F3F6FB] px-2.5 py-2">
                          <span>Team</span>
                          <input
                            value={profile.team}
                            onChange={(e) => setProfile((current) => ({ ...current, team: e.target.value }))}
                            className="w-28 rounded-md border border-[#D9E3F4] bg-white px-2 py-1 text-right text-[12px] font-medium text-[#1B2130] outline-none"
                          />
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-[#F3F6FB] px-2.5 py-2">
                          <span>Role</span>
                          <input
                            value={profile.role}
                            onChange={(e) => setProfile((current) => ({ ...current, role: e.target.value }))}
                            className="w-28 rounded-md border border-[#D9E3F4] bg-white px-2 py-1 text-right text-[12px] font-medium text-[#1B2130] outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={saveProfile}
                        className="w-full rounded-lg bg-[#1755F5] px-3 py-2 text-sm font-semibold text-white"
                      >
                        Save changes
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 rounded-xl border border-[#EEF0F4] bg-[#F9FAFC] p-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#9AC4FF] to-[#7C8DFF]" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1B2130]">{profile.name}</p>
                          <p className="text-[11px] text-[#5F6F8C]">{profile.role} • Aura Digital Labs</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-[12px] text-[#4E5D7A]">
                        <div className="flex items-center justify-between rounded-lg bg-[#F3F6FB] px-2.5 py-2"><span>Team</span><span className="font-medium text-[#1B2130]">{profile.team}</span></div>
                        <div className="flex items-center justify-between rounded-lg bg-[#F3F6FB] px-2.5 py-2"><span>Role</span><span className="font-medium text-[#1B2130]">{profile.role}</span></div>
                        <div className="flex items-center justify-between rounded-lg bg-[#F3F6FB] px-2.5 py-2"><span>Status</span><span className="font-medium text-[#2FAE60]">{profile.status}</span></div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </header>

        {view === "Home Feed"? (
          <HomeFeed />
        ) : view === "Inventory"? (
          <div className="px-8 py-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Inventory - 3 Angels Water Station</h2>
              <button className="rounded-lg bg-[#1755F5] px-4 py-2 text-sm text-white">+ Add Stock</button>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#E3E7EF] bg-white p-4"><p className="text-xs text-[#8890A6]">Total Stock</p><p className="mt-1 text-2xl font-semibold">225</p></div>
              <div className="rounded-xl border border-[#E3E7EF] bg-white p-4"><p className="text-xs text-[#8890A6]">Low Stock</p><p className="mt-1 text-2xl font-semibold text-[#E14D4D]">1</p></div>
              <div className="rounded-xl border border-[#E3E7EF] bg-white p-4"><p className="text-xs text-[#8890A6]">Categories</p><p className="mt-1 text-2xl font-semibold">3</p></div>
            </div>
            <div className="rounded-xl border border-[#E3E7EF] bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold">Stock List</h3>
              <table className="w-full text-left text-sm">
                <thead><tr className="text-[11px] uppercase text-[#8890A6]"><th className="pb-3 font-medium">Item Name</th><th className="pb-3 font-medium">Category</th><th className="pb-3 font-medium">Stock</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Action</th></tr></thead>
                <tbody>
                  {[
                    { name: "Round Gallon 5gal", cat: "Bottle", stock: 120, color: "#2FAE60", status: "In Stock" },
                    { name: "Slim Gallon", cat: "Bottle", stock: 85, color: "#2FAE60", status: "In Stock" },
                    { name: "Water Caps / Seals", cat: "Supplies", stock: 12, color: "#E14D4D", status: "Low Stock" },
                    { name: "Dispenser Faucet", cat: "Accessories", stock: 8, color: "#2FAE60", status: "In Stock" },
                  ].map((row) => (
                    <tr key={row.name} className="border-t border-[#EEF0F4] text-[#3A4256]">
                      <td className="py-3 font-medium">{row.name}</td>
                      <td className="py-3">{row.cat}</td>
                      <td className="py-3">{row.stock}</td>
                      <td className="py-3"><span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs" style={{ backgroundColor: `${row.color}1A`, color: row.color }}><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: row.color }} /> {row.status}</span></td>
                      <td className="py-3"><Pencil size={14} className="text-[#8890A6]" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : view === "Supplies"? (
          <SuppliesSection />
        ) : view === "Settings"? (
          <SettingsSection />
        ) : view === "Orders"? (
          <OrdersSection />
        ) : (
          <div className="px-8 py-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Overview</h2>
              <div className="flex overflow-hidden rounded-lg border border-[#E3E7EF] bg-white text-xs">
                {["Today", "This Week", "This Month"].map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={`px-4 py-2 ${range === r? "bg-[#1755F5] text-white" : "text-[#6B7383]"}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="mb-6 grid grid-cols-4 gap-4">
              {statCards.map((c) => (
                <div key={c.label} className="rounded-xl border border-[#E3E7EF] bg-white p-4">
                  <div className="mb-3 flex items-center justify-between"><span className="text-xs text-[#8890A6]">{c.label}</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F5F9] text-[#1755F5]">{typeof c.icon === "string"? c.icon : <c.icon size={15} />}</span></div>
                  <p className="mb-1 text-2xl font-semibold">{c.value}</p>
                  <p className={`flex items-center gap-1 text-xs ${c.neutral? "text-[#8890A6]" : c.up? "text-[#2FAE60]" : "text-[#E14D4D]"}`}>{!c.neutral && (c.up? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />)}{c.delta}</p>
                </div>
              ))}
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 rounded-xl border border-[#E3E7EF] bg-white p-5"><h3 className="mb-4 text-sm font-semibold">Daily Performance</h3><ResponsiveContainer width="100%" height={220}><BarChart data={dailyPerformance} barGap={4}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8890A6", fontSize: 11 }} /><Bar dataKey="target" fill="#C6D3F7" radius={[3,3,0,0]} /><Bar dataKey="actual" fill="#1755F5" radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></div>
              <div className="rounded-xl border border-[#E3E7EF] bg-white p-5"><h3 className="mb-2 text-sm font-semibold">Order Distribution</h3><div className="relative flex items-center justify-center"><ResponsiveContainer width="100%" height={190}><PieChart><Pie data={orderDistribution} dataKey="value" innerRadius={55} outerRadius={80} startAngle={90} endAngle={-270} stroke="none"><Cell fill="#1755F5" /><Cell fill="#C6D3F7" /></Pie></PieChart></ResponsiveContainer><div className="pointer-events-none absolute flex flex-col items-center"><span className="text-xl font-semibold">324</span><span className="text-[11px] text-[#8890A6]">Orders</span></div></div></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
