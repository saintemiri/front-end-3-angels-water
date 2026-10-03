import React from "react";
import { UserPlus, FileText, ShieldCheck, Download, ArrowLeft } from "lucide-react";

const actions = [
  { icon: UserPlus, title: "Add User", subtitle: "Provision new account" },
  { icon: FileText, title: "Generate Report", subtitle: "Export weekly metrics" },
  { icon: ShieldCheck, title: "System Check", subtitle: "Run diagnostics" },
];

const events = [
  { text: "Database backup completed successfully", user: "System", time: "10 mins ago", status: "#2FAE60" },
  { text: "Failed login attempt detected", user: "Unknown IP", time: "45 mins ago", status: "#E14D4D" },
  { text: "New user profile created", user: "J. Smith", time: "2 hrs ago", status: "#2FAE60" },
  { text: "Weekly metrics report generated", user: "Admin", time: "5 hrs ago", status: "#2FAE60" },
];

const reportMetrics = [
  { label: "Total Active Users Today", value: "60", delta: "+125 vs yesterday" },
  { label: "Active Sessions", value: "53", delta: "+5% vs yesterday" },
  { label: "Revenue", value: "₱1,250", delta: "-10% vs yesterday" },
];

const reportRows = [
  { label: "Orders Delivered", value: "176" },
  { label: "Pending Orders", value: "48" },
  { label: "Active Customers", value: "320" },
  { label: "System Health", value: "99.9%" },
];

export default function HomeFeed() {
  const [selectedAction, setSelectedAction] = React.useState(null);

  const handleExportWeeklyMetrics = () => {
    const rows = [
      ["Metric", "Value"],
      ...reportRows.map((row) => [row.label, row.value]),
      ["", ""],
      ["Notes", "Weekly summary generated from the current dashboard metrics."],
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "3-angels-water-weekly-metrics.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-8 py-6">
      <h2 className="mb-1 text-lg font-semibold text-[#1B2130]">
        Good morning, Administrator
      </h2>
      <p className="mb-6 text-sm text-[#8890A6]">
        Here's an overview of your system today.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#E3E7EF] bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-[#1B2130]">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            {actions.map(({ icon: Icon, title, subtitle }) => {
              const isSelected = selectedAction === title;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setSelectedAction(title)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                    isSelected
                      ? "border-[#1755F5] bg-[#EEF4FF]"
                      : "border-[#E3E7EF] bg-[#F8FAFC] hover:bg-[#F3F5F9]"
                  }`}
                >
                  <Icon size={18} className="text-[#1755F5]" />
                  <div>
                    <p className="text-sm font-medium text-[#1B2130]">{title}</p>
                    <p className="text-xs text-[#8890A6]">{subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedAction === "Generate Report" ? (
          <div className="col-span-2 rounded-xl border border-[#E3E7EF] bg-white p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8890A6]">
                  Quick Actions
                </p>
                <h3 className="mt-1 text-xl font-semibold text-[#1B2130]">
                  Generate Report
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAction(null)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E3E7EF] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#1B2130]"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  type="button"
                  onClick={handleExportWeeklyMetrics}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1755F5] px-3 py-2 text-xs font-semibold text-white"
                >
                  <Download size={14} /> Export weekly metrics
                </button>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {reportMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-[#E3E7EF] bg-[#F8FAFC] p-3">
                  <p className="text-[11px] text-[#8890A6]">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#1B2130]">{metric.value}</p>
                  <p className="mt-1 text-[11px] text-[#2FAE60]">{metric.delta}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#E3E7EF] bg-[#F9FAFC] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#1B2130]">Weekly summary</h4>
                <span className="rounded-full bg-[#EEF4FF] px-2 py-1 text-[10px] font-medium text-[#1755F5]">
                  Updated 2 hrs ago
                </span>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-[#8890A6]">
                    <th className="pb-3 font-medium">Metric</th>
                    <th className="pb-3 text-right font-medium">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((row) => (
                    <tr key={row.label} className="border-t border-[#EEF0F4] text-[#3A4256]">
                      <td className="py-3">{row.label}</td>
                      <td className="py-3 text-right font-medium text-[#1B2130]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="col-span-2 rounded-xl border border-[#E3E7EF] bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#1B2130]">
              Recent Activity
            </h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-[#8890A6]">
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-[#EEF0F4] text-[#3A4256]">
                    <td className="py-3">
                      <span
                        className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: e.status }}
                      />
                      {e.text}
                    </td>
                    <td className="py-3 text-[#6B7383]">{e.user}</td>
                    <td className="py-3 text-xs text-[#8890A6]">{e.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
