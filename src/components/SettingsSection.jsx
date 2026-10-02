import React, { useState } from "react";
import {
  UserCircle,
  Bell,
  Briefcase,
  Monitor,
  ChevronRight,
} from "lucide-react";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#1755F5]" : "bg-[#D9DEE8]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SettingsCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-[#E3E7EF] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={16} className="text-[#8890A6]" />
        <h3 className="text-sm font-semibold text-[#1B2130]">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function LinkRow({ label, subtitle }) {
  return (
    <button className="flex items-center justify-between text-left">
      <div>
        <p className="text-sm font-medium text-[#1B2130]">{label}</p>
        <p className="text-xs text-[#8890A6]">{subtitle}</p>
      </div>
      <ChevronRight size={16} className="text-[#8890A6]" />
    </button>
  );
}

export default function SettingsSection() {
  const [emailDigests, setEmailDigests] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  return (
    <div className="px-8 py-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1B2130]">
        Platform Settings
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <SettingsCard icon={UserCircle} title="Account">
          <LinkRow
            label="Profile Details"
            subtitle="Update personal information and avatar"
          />
          <LinkRow
            label="Security & Authentication"
            subtitle="Manage passwords and 2FA"
          />
        </SettingsCard>

        <SettingsCard icon={Bell} title="Notifications">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1B2130]">
                Email Digests
              </p>
              <p className="text-xs text-[#8890A6]">
                Receive weekly summary reports via email
              </p>
            </div>
            <Toggle
              checked={emailDigests}
              onChange={() => setEmailDigests((v) => !v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1B2130]">
                Push Alerts
              </p>
              <p className="text-xs text-[#8890A6]">
                Real-time alerts for critical system events
              </p>
            </div>
            <Toggle
              checked={pushAlerts}
              onChange={() => setPushAlerts((v) => !v)}
            />
          </div>
        </SettingsCard>

        <SettingsCard icon={Briefcase} title="Workspaces">
          <div className="flex items-center justify-between rounded-lg border border-[#E3E7EF] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F3F5F9] text-xs font-semibold text-[#4B5468]">
                AC
              </div>
              <span className="text-sm font-medium text-[#1B2130]">
                Acme Corp
              </span>
            </div>
            <span className="rounded-full bg-[#EAF0FF] px-2.5 py-1 text-xs font-medium text-[#1755F5]">
              Active
            </span>
          </div>
          <button className="rounded-lg border border-dashed border-[#C7CEDD] py-2 text-sm text-[#6B7383] hover:bg-[#F8FAFC]">
            + Join or Create Workspace
          </button>
        </SettingsCard>

        <SettingsCard icon={Monitor} title="System">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1B2130]">
              Interface Theme
            </p>
            <button className="flex items-center gap-1 rounded-lg border border-[#E3E7EF] px-3 py-1.5 text-xs text-[#4B5468]">
              Light Mode
              <ChevronRight size={12} className="rotate-90" />
            </button>
          </div>
          <LinkRow label="Language & Region" subtitle="English (US)" />
          <LinkRow
            label="Audit Logs"
            subtitle="View system activity history"
          />
        </SettingsCard>
      </div>
    </div>
  );
}
