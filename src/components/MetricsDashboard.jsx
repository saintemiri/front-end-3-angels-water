import HomeFeed from "./HomeFeed.jsx";
import SuppliesSection from "./SuppliesSection.jsx";
import SettingsSection from "./SettingsSection.jsx";
import React from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Truck,
  Users,
  BarChart2,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  Bell,
  Grid3x3,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Pencil,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
  {
    icon: Users,
    label: "Total Active Users Today",
    value: "60",
    delta: "+125 vs yesterday",
    up: true,
  },
  {
    icon: BarChart2,
    label: "Active Sessions",
    value: "53",
    delta: "+5% vs yesterday",
    up: true,
  },
  {
    icon: "₱",
    label: "Revenue",
    value: "₱1,250",
    delta: "-10% vs yesterday",
    up: false,
  },
  {
    icon: ShieldCheck,
    label: "System Health",
    value: "99.9%",
    delta: "All systems operational",
    up: true,
    neutral: true,
  },
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

const detailedMetrics = [
  {
    name: "Magdalena Rodriguez",
    status: "In Progress",
    statusColor: "#8B93A6",
    completion: 50,
    updated: "5min ago",
  },
  {
    name: "Gabo Maderazo",
    status: "Out for Delivery",
    statusColor: "#E5943A",
    completion: 75,
    updated: "10min ago",
  },
  {
    name: "Bogart Batumbakal",
    status: "Delivered",
    statusColor: "#2FAE60",
    completion: 100,
    updated: "20min ago",
  },
];

export default function MetricsDashboard({ initialView = "Analytics" }) {
  const [range, setRange] = React.useState("Today");
  const [view, setView] = React.useState(initialView);

  return (
    <div className="flex h-screen w-full bg-[#EEF1F6] font-sans text-[#1B2130]">
      <aside className="flex w-60 flex-shrink-0 flex-col justify-between bg-[#101C36] text-[#C7CEDD]">
        <div>
          <div className="flex items-center gap-3 px-5 py-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#101C36]">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin Portal</p>
              <p className="text-[11px] text-[#8890A6]">3 Angels Water Station</p>
            </div>
          </div>

          <nav className="mt-2 flex flex-col gap-1 px-3">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setView(label)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  view === label
                    ? "bg-[#1755F5] text-white"
                    : "text-[#AEB6C9] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-white/10 px-3 py-4">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#AEB6C9] hover:bg-white/5 hover:text-white">
            <LifeBuoy size={17} strokeWidth={1.8} />
            Support
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#AEB6C9] hover:bg-white/5 hover:text-white">
            <LogOut size={17} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b border-[#E3E7EF] bg-white px-8 py-4">
          <h1 className="text-[15px] font-semibold text-[#1B2130]">
            {view}
          </h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 rounded-lg bg-[#F3F5F9] px-3 py-2 text-sm text-[#8890A6]">
              <Search size={15} />
              <span>Search...</span>
            </div>
            <Bell size={18} className="text-[#8890A6]" />
            <Grid3x3 size={18} className="text-[#8890A6]" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#D9DEE8]" />
              <span className="text-sm text-[#4B5468]">Profile</span>
            </div>
          </div>
        </header>

        {view === "Home Feed" ? (
          <HomeFeed />
        ) : view === "Supplies" ? (
          <SuppliesSection />
        ) : view === "Settings" ? (
          <SettingsSection />
        ) : (
          <div className="px-8 py-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1B2130]">Overview</h2>
              <div className="flex overflow-hidden rounded-lg border border-[#E3E7EF] bg-white text-xs">
                {["Today", "This Week", "This Month"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      range === r
                        ? "bg-[#1755F5] text-white"
                        : "text-[#6B7383] hover:bg-[#F3F5F9]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-4">
              {statCards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-[#E3E7EF] bg-white p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-[#8890A6]">{c.label}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F5F9] text-[#1755F5]">
                      {typeof c.icon === "string" ? (
                        <span className="text-sm font-semibold">{c.icon}</span>
                      ) : (
                        <c.icon size={15} strokeWidth={1.8} />
                      )}
                    </span>
                  </div>
                  <p className="mb-1 text-2xl font-semibold text-[#1B2130]">
                    {c.value}
                  </p>
                  <p
                    className={`flex items-center gap-1 text-xs font-medium ${
                      c.neutral
                        ? "text-[#8890A6]"
                        : c.up
                        ? "text-[#2FAE60]"
                        : "text-[#E14D4D]"
                    }`}
                  >
                    {!c.neutral &&
                      (c.up ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <ArrowDownRight size={12} />
                      ))}
                    {c.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 rounded-xl border border-[#E3E7EF] bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold text-[#1B2130]">
                  Daily Performance
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dailyPerformance} barGap={4}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8890A6", fontSize: 11 }}
                    />
                    <Bar dataKey="target" fill="#C6D3F7" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="actual" fill="#1755F5" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl border border-[#E3E7EF] bg-white p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#1B2130]">
                    Order Distribution
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8890A6]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#1755F5]" /> Actual
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#C6D3F7]" /> Target
                  </span>
                </div>
                <div className="relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={190}>
                    <PieChart>
                      <Pie
                        data={orderDistribution}
                        dataKey="value"
                        innerRadius={55}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                      >
                        <Cell fill="#1755F5" />
                        <Cell fill="#C6D3F7" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute flex flex-col items-center">
                    <span className="text-xl font-semibold text-[#1B2130]">
                      324
                    </span>
                    <span className="text-[11px] text-[#8890A6]">Orders</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E3E7EF] bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#1B2130]">
                  Detailed Metrics
                </h3>
                <div className="flex items-center gap-2 rounded-lg bg-[#F3F5F9] px-3 py-1.5 text-xs text-[#8890A6]">
                  <Search size={13} />
                  <span>Filter projects...</span>
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-[#8890A6]">
                    <th className="pb-3 font-medium">Customer Name</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Completion</th>
                    <th className="pb-3 font-medium">Last Updated</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedMetrics.map((row) => (
                    <tr
                      key={row.name}
                      className="border-t border-[#EEF0F4] text-[#3A4256]"
                    >
                      <td className="py-3">{row.name}</td>
                      <td className="py-3">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs"
                          style={{
                            backgroundColor: `${row.statusColor}1A`,
                            color: row.statusColor,
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: row.statusColor }}
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#EEF0F4]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${row.completion}%`,
                                backgroundColor: row.statusColor,
                              }}
                            />
                          </div>
                          <span className="text-xs text-[#8890A6]">
                            {row.completion}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-[#8890A6]">
                        {row.updated}
                      </td>
                      <td className="py-3">
                        <Pencil size={14} className="text-[#8890A6]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
