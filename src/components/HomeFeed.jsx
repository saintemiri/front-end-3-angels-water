import { UserPlus, FileText, ShieldCheck } from "lucide-react";

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

export default function HomeFeed() {
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
            {actions.map(({ icon: Icon, title, subtitle }) => (
              <button
                key={title}
                className="flex items-center gap-3 rounded-lg border border-[#E3E7EF] bg-[#F8FAFC] p-3 text-left hover:bg-[#F3F5F9]"
              >
                <Icon size={18} className="text-[#1755F5]" />
                <div>
                  <p className="text-sm font-medium text-[#1B2130]">{title}</p>
                  <p className="text-xs text-[#8890A6]">{subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
}