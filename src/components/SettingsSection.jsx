import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  ClipboardList,
  KeyRound,
  Monitor,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

const AUDIT_LOGS = [
  { time: "Today, 10:42 AM", activity: "Updated inventory stock", actor: "Sarah Jenkins", result: "Completed" },
  { time: "Today, 09:18 AM", activity: "Reviewed order ORD-004", actor: "Sarah Jenkins", result: "Completed" },
  { time: "Today, 08:55 AM", activity: "Staff account signed in", actor: "Ava James", result: "Successful" },
  { time: "Yesterday, 04:30 PM", activity: "Changed delivery status", actor: "Sarah Jenkins", result: "Completed" },
  { time: "Yesterday, 02:14 PM", activity: "Inventory alert generated", actor: "System", result: "Notice" },
];

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      style={{ borderRadius: "9999px" }}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#1755F5]" : "bg-[#D9DEE8]"
      }`}
    >
      <span
        style={{ borderRadius: "50%" }}
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingsCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-xl border border-[#E3E7EF] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={16} className="text-[#8890A6]" />
        <h3 className="text-sm font-semibold text-[#1B2130]">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function SettingsLink({ label, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[#F7F9FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1755F5]"
    >
      <span>
        <span className="block text-sm font-medium text-[#1B2130]">{label}</span>
        <span className="mt-0.5 block text-xs text-[#8890A6]">{subtitle}</span>
      </span>
      <ChevronRight size={16} className="text-[#8890A6]" />
    </button>
  );
}

function SettingsPageHeader({ title, description, onBack }) {
  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-[#1755F5] hover:underline"
      >
        <ArrowLeft size={14} />
        All settings
      </button>
      <h2 className="text-lg font-semibold text-[#1B2130]">{title}</h2>
      <p className="mt-1 text-sm text-[#8890A6]">{description}</p>
    </div>
  );
}

function ProfileDetails({ onBack }) {
  const [profile, setProfile] = useState({
    name: "Sarah Jenkins",
    email: "sarah.jenkins@3angelswater.com",
    team: "Core Systems",
    role: "Administrator",
  });
  const [saved, setSaved] = useState(false);

  const update = (field) => (event) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="px-8 py-6">
      <SettingsPageHeader
        title="Profile Details"
        description="Update the administrator profile details shown in the portal."
        onBack={onBack}
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-xl border border-[#E3E7EF] bg-white p-6"
      >
        {saved && (
          <p role="status" className="mb-5 flex items-center gap-2 rounded-lg bg-[#F0FBF4] p-3 text-sm text-[#237A43]">
            <Check size={16} /> Profile details saved.
          </p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs font-medium text-[#4B5468]">
            Full name
            <input
              required
              value={profile.name}
              onChange={update("name")}
              autoComplete="name"
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm text-[#1B2130] outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="text-xs font-medium text-[#4B5468]">
            Work email
            <input
              required
              type="email"
              value={profile.email}
              onChange={update("email")}
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm text-[#1B2130] outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="text-xs font-medium text-[#4B5468]">
            Team
            <input
              value={profile.team}
              onChange={update("team")}
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm text-[#1B2130] outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="text-xs font-medium text-[#4B5468]">
            Role
            <input
              value={profile.role}
              onChange={update("role")}
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm text-[#1B2130] outline-none focus:border-[#1755F5]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg bg-[#1755F5] px-4 py-2 text-sm font-medium text-white hover:bg-[#123FC0]"
        >
          Save profile
        </button>
      </form>
    </div>
  );
}

function SecuritySettings({ onBack }) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newPassword = String(formData.get("newPassword"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (newPassword !== confirmPassword) {
      setMessage("");
      setError("The new password and confirmation do not match.");
      return;
    }

    setError("");
    setMessage("Password change saved for this demo. No password is sent or stored.");
    form.reset();
  };

  return (
    <div className="px-8 py-6">
      <SettingsPageHeader
        title="Security & Authentication"
        description="Manage password settings and additional sign-in protection."
        onBack={onBack}
      />
      <div className="grid max-w-4xl gap-4">
        <section className="rounded-xl border border-[#E3E7EF] bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <KeyRound size={17} className="text-[#1755F5]" />
            <h3 className="text-sm font-semibold text-[#1B2130]">Change password</h3>
          </div>
          {message && <p role="status" className="mb-4 rounded-lg bg-[#F0FBF4] p-3 text-sm text-[#237A43]">{message}</p>}
          {error && <p role="alert" className="mb-4 rounded-lg bg-[#FFF4F4] p-3 text-sm text-[#B33333]">{error}</p>}
          <form onSubmit={handlePasswordChange} className="grid grid-cols-3 items-end gap-4">
            <label className="text-xs font-medium text-[#4B5468]">
              Current password
              <input
                required
                type="password"
                name="currentPassword"
                autoComplete="current-password"
                className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm outline-none focus:border-[#1755F5]"
              />
            </label>
            <label className="text-xs font-medium text-[#4B5468]">
              New password
              <input
                required
                minLength={8}
                type="password"
                name="newPassword"
                autoComplete="new-password"
                className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm outline-none focus:border-[#1755F5]"
              />
            </label>
            <label className="text-xs font-medium text-[#4B5468]">
              Confirm new password
              <input
                required
                minLength={8}
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2.5 text-sm outline-none focus:border-[#1755F5]"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-[#1755F5] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123FC0] sm:col-span-1"
            >
              Update password
            </button>
          </form>
        </section>

        <section className="flex items-center justify-between gap-5 rounded-xl border border-[#E3E7EF] bg-white p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="mt-0.5 text-[#1755F5]" />
            <div>
              <h3 className="text-sm font-semibold text-[#1B2130]">Two-factor authentication</h3>
              <p className="mt-1 text-xs text-[#8890A6]">
                {twoFactorEnabled ? "Extra sign-in protection is enabled." : "Require an additional verification step when signing in."}
              </p>
            </div>
          </div>
          <Toggle
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled((enabled) => !enabled)}
            label="Two-factor authentication"
          />
        </section>
        <p className="text-xs text-[#8890A6]">
          Security controls are a frontend demo and are not connected to an authentication service.
        </p>
      </div>
    </div>
  );
}

function AuditLogs({ onBack }) {
  const [query, setQuery] = useState("");
  const filteredLogs = AUDIT_LOGS.filter((entry) =>
    `${entry.time} ${entry.activity} ${entry.actor} ${entry.result}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <div className="px-8 py-6">
      <SettingsPageHeader
        title="Audit Logs"
        description="Review recent administrator and system activity."
        onBack={onBack}
      />
      <section className="overflow-hidden rounded-xl border border-[#E3E7EF] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF0F4] p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#1B2130]">
            <ClipboardList size={17} className="text-[#1755F5]" />
            Recent activity
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search audit logs"
            placeholder="Filter activity..."
            className="w-full max-w-xs rounded-lg border border-[#E3E7EF] px-3 py-2 text-sm outline-none focus:border-[#1755F5]"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-[#F7F9FC] text-xs text-[#8890A6]">
              <tr>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Activity</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((entry) => (
                <tr key={`${entry.time}-${entry.activity}`} className="border-t border-[#EEF0F4] text-[#3A4256]">
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-[#6B7383]">{entry.time}</td>
                  <td className="px-5 py-3 font-medium">{entry.activity}</td>
                  <td className="px-5 py-3">{entry.actor}</td>
                  <td className="px-5 py-3">{entry.result}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-[#8890A6]">
                    No activity matches your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </section>
    </div>
  );
}

export default function SettingsSection() {
  const [emailDigests, setEmailDigests] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [darkThemePreference, setDarkThemePreference] = useState(() => {
    try {
      return window.localStorage.getItem("admin-theme-preference") === "dark";
    } catch (error) {
      console.error("Unable to load admin theme preference.", error);
      return false;
    }
  });
  const [themeError, setThemeError] = useState("");
  const [activePage, setActivePage] = useState(null);

  const toggleTheme = () => {
    const nextTheme = darkThemePreference ? "light" : "dark";
    try {
      window.localStorage.setItem("admin-theme-preference", nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      setDarkThemePreference(nextTheme === "dark");
      setThemeError("");
    } catch (error) {
      console.error("Unable to save admin theme preference.", error);
      setThemeError("Theme preference could not be saved. Please try again.");
    }
  };

  if (activePage === "profile") {
    return <ProfileDetails onBack={() => setActivePage(null)} />;
  }
  if (activePage === "security") {
    return <SecuritySettings onBack={() => setActivePage(null)} />;
  }
  if (activePage === "audit") {
    return <AuditLogs onBack={() => setActivePage(null)} />;
  }

  return (
    <div className="px-8 py-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1B2130]">
        Platform Settings
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <SettingsCard icon={UserCircle} title="Account">
          <SettingsLink
            label="Profile Details"
            subtitle="Update personal information and role"
            onClick={() => setActivePage("profile")}
          />
          <SettingsLink
            label="Security & Authentication"
            subtitle="Manage password and two-factor authentication"
            onClick={() => setActivePage("security")}
          />
        </SettingsCard>

        <SettingsCard icon={Bell} title="Notifications">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#1B2130]">Email Digests</p>
              <p className="text-xs text-[#8890A6]">Receive weekly summary reports via email</p>
            </div>
            <Toggle
              checked={emailDigests}
              onChange={() => setEmailDigests((value) => !value)}
              label="Email digests"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#1B2130]">Push Alerts</p>
              <p className="text-xs text-[#8890A6]">Real-time alerts for critical system events</p>
            </div>
            <Toggle
              checked={pushAlerts}
              onChange={() => setPushAlerts((value) => !value)}
              label="Push alerts"
            />
          </div>
        </SettingsCard>

        <SettingsCard icon={Monitor} title="System">
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-sm font-medium text-[#1B2130]">
              Interface Theme
              <select
                value={darkThemePreference ? "dark" : "light"}
                onChange={(event) => {
                  const nextTheme = event.target.value === "dark";
                  if (nextTheme !== darkThemePreference) toggleTheme();
                }}
                aria-label="Interface theme"
                className="rounded-lg border border-[#E3E7EF] bg-white px-3 py-2 text-xs text-[#4B5468] outline-none focus:border-[#1755F5]"
              >
                <option value="light">Light mode</option>
                <option value="dark">Dark mode</option>
              </select>
            </label>
          </div>
          <p className="text-xs text-[#8890A6]">Choose the appearance for the admin portal.</p>
          {themeError && (
            <p role="alert" className="text-xs text-[#B33333]">{themeError}</p>
          )}
          <SettingsLink
            label="Audit Logs"
            subtitle="View recent system activity"
            onClick={() => setActivePage("audit")}
          />
        </SettingsCard>
      </div>
    </div>
  );
}
