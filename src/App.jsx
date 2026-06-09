import React, { useState } from "react";
import {
  Mail, Copy, Check, Calendar, Clock,
  ShieldCheck, Tag, Smartphone, Monitor, Tv, Cpu,
  Flag, SlidersHorizontal, ChevronDown, ChevronRight,
  Wifi, Route, ShieldAlert, Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data — replace with API payload from /admin/users/:id          */
/* ------------------------------------------------------------------ */
const USER = {
  id: "usr_9f3a21c47e",
  email: "chen.weihao@example.com",
  emailVerified: true,
  status: "active",
  registeredAt: "2025-09-14",
  lastActiveAt: "2026-06-04 09:12",
  tenureDays: 263,
  channel: "huawei_store_v3",
  referredBy: "usr_2c81…",
  referralsMade: 4,
  tags: [
    { label: "High Traffic", tone: "blue" },
    { label: "Active Daily", tone: "emerald" },
    { label: "Annual Payer", tone: "violet" },
    { label: "Loyal (>6mo)", tone: "amber" },
    { label: "Conversion: High", tone: "rose" },
  ],
  monetization: {
    plan: "MAX",
    planExpiry: "2026-11-20",
    daysRemaining: 169,
    totalPaid: 696.0,
    paymentCount: 3,
    firstPayment: "2025-09-14",
    lastPayment: "2025-11-20",
    creditBalance: 1240,
  },
  risk: { dr: 0.18, tr: 0.09, severity: 0.09, state: "Clear" },
};

const DEVICE_DATA = [
  {
    type: "android",
    name: "HUAWEI Mate 60",
    os: "Android 14",
    app: "3.8.2",
    lastSeen: "2026-06-04 09:12",
    current: true,
    totalRam: "12 GB",
    availableMemory: "4.2 GB",
    settings: [
      {
        group: "Connection",
        icon: ShieldCheck,
        items: [
          { name: "Connection Safeguard Mode", value: "On", type: "bool", changed: "2026-05-30" },
          { name: "Stable Mode", value: "On", type: "bool", changed: "2026-04-12" },
          { name: "Smart/Global Mode", value: "Smart", type: "text", changed: "2026-05-30" },
          { name: "VPN Access Permission", value: "Granted", type: "text", tone: "emerald", changed: "2026-05-30" },
        ],
      },
      {
        group: "Routing / Split Tunneling",
        icon: Route,
        items: [
          { name: "Bypass VPN", value: "On", type: "bool", changed: "2026-05-30" },
          { name: "Manage Excluded Apps", value: "3 apps", type: "list", changed: "2026-05-30", list: ["com.tencent.mm", "com.taobao.taobao", "com.unionpay"] },
          { name: "Manage Excluded Websites", value: "2 sites", type: "list", changed: "2026-05-22", list: ["bank.example.cn", "gov.example.cn"] },
        ],
      },
      {
        group: "Network",
        icon: Wifi,
        items: [
          { name: "Use Local DNS", value: "Off", type: "bool", changed: "2026-03-01" },
          { name: "Ad-Block", value: "On", type: "bool", changed: "2026-05-11" },
          { name: "IPv6", value: "On", type: "bool", changed: "2026-04-20" },
        ],
      },
    ],
    flags: [
      { key: "ai-chat-visibility", enabled: true, reason: "Segment: paid_users" },
      { key: "ai-image-generation-visibility", enabled: true, reason: "Segment: paid_users" },
      { key: "referral-system-visibility", enabled: true, reason: "Default ON" },
      { key: "subscription-plan-visibility", enabled: true, reason: "Default ON" },
      { key: "credit-plans-visibility", enabled: true, reason: "Default ON" },
      { key: "in-app-feedback-visibility", enabled: true, reason: "Default ON" },
      { key: "conditional-feedback-visibility", enabled: false, reason: "Condition not met" },
      { key: "dragon-boat-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "plan-privilege-comparison-table-visibility", variant: "variant_b", enabled: true, reason: "A/B test • 20% bucket", description: "variant_a: red · variant_b: blue · control: yellow" },
      { key: "mooncake-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "ipv6-visibility", enabled: true, reason: "Rollout 20% • never-paid? no → forced on (paid)" },
      { key: "task-system-visibility", enabled: true, reason: "Default ON" },
    ],
  },
  {
    type: "windows",
    name: "Windows PC",
    os: "Windows 11",
    app: "3.8.0",
    lastSeen: "2026-06-03 21:40",
    current: false,
    totalRam: "16 GB",
    availableMemory: "8.1 GB",
    settings: [
      {
        group: "Connection",
        icon: ShieldCheck,
        items: [
          { name: "Connection Safeguard Mode", value: "On", type: "bool", changed: "2026-05-28" },
          { name: "Stable Mode", value: "Off", type: "bool", changed: "2026-04-01" },
          { name: "Tun2Proxy", value: "On", type: "bool", changed: "2026-05-10" },
          { name: "Smart/Global Mode", value: "Global", type: "text", changed: "2026-04-15" },
          { name: "VPN Access Permission", value: "Granted", type: "text", tone: "emerald", changed: "2026-05-28" },
        ],
      },
      {
        group: "Routing / Split Tunneling",
        icon: Route,
        items: [
          { name: "Bypass VPN", value: "Off", type: "bool", changed: "2026-04-15" },
          { name: "Manage Excluded Apps", value: "0 apps", type: "list", changed: "2026-04-15", list: [] },
          { name: "Manage Excluded Websites", value: "1 site", type: "list", changed: "2026-05-01", list: ["gov.example.cn"] },
        ],
      },
      {
        group: "Network",
        icon: Wifi,
        items: [
          { name: "Use Local DNS", value: "On", type: "bool", changed: "2026-02-14" },
          { name: "Ad-Block", value: "On", type: "bool", changed: "2026-05-11" },
          { name: "IPv6", value: "On", type: "bool", changed: "2026-04-20" },
        ],
      },
    ],
    flags: [
      { key: "ai-chat-visibility", enabled: true, reason: "Segment: paid_users" },
      { key: "ai-image-generation-visibility", enabled: false, reason: "Desktop: not supported" },
      { key: "referral-system-visibility", enabled: true, reason: "Default ON" },
      { key: "subscription-plan-visibility", enabled: true, reason: "Default ON" },
      { key: "credit-plans-visibility", enabled: true, reason: "Default ON" },
      { key: "in-app-feedback-visibility", enabled: true, reason: "Default ON" },
      { key: "conditional-feedback-visibility", enabled: false, reason: "Condition not met" },
      { key: "dragon-boat-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "plan-privilege-comparison-table-visibility", variant: "variant_a", enabled: true, reason: "A/B test • control bucket", description: "variant_a: red · variant_b: blue · control: yellow" },
      { key: "mooncake-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "ipv6-visibility", enabled: true, reason: "Rollout 20% • never-paid? no → forced on (paid)" },
      { key: "task-system-visibility", enabled: true, reason: "Default ON" },
    ],
  },
  {
    type: "androidtv",
    name: "Xiaomi TV Box",
    os: "Android TV 12",
    app: "3.7.5",
    lastSeen: "2026-05-29 20:11",
    current: false,
    totalRam: "4 GB",
    availableMemory: "1.8 GB",
    settings: [
      {
        group: "Connection",
        icon: ShieldCheck,
        items: [
          { name: "Connection Safeguard Mode", value: "Off", type: "bool", changed: "2026-03-12" },
          { name: "Stable Mode", value: "On", type: "bool", changed: "2026-03-12" },
          { name: "Smart/Global Mode", value: "Smart", type: "text", changed: "2026-03-12" },
          { name: "VPN Access Permission", value: "Denied", type: "text", tone: "rose", changed: "2026-03-12" },
        ],
      },
      {
        group: "Routing / Split Tunneling",
        icon: Route,
        items: [
          { name: "Bypass VPN", value: "Off", type: "bool", changed: "2026-03-12" },
          { name: "Manage Excluded Apps", value: "0 apps", type: "list", changed: "2026-03-12", list: [] },
          { name: "Manage Excluded Websites", value: "0 sites", type: "list", changed: "2026-03-12", list: [] },
        ],
      },
      {
        group: "Network",
        icon: Wifi,
        items: [
          { name: "Use Local DNS", value: "Off", type: "bool", changed: "2026-03-01" },
          { name: "Ad-Block", value: "Off", type: "bool", changed: "2026-03-12" },
          { name: "IPv6", value: "Not Supported", type: "text", tone: "neutral", changed: "2026-03-12" },
        ],
      },
    ],
    flags: [
      { key: "ai-chat-visibility", enabled: false, reason: "TV platform: not supported" },
      { key: "ai-image-generation-visibility", enabled: false, reason: "TV platform: not supported" },
      { key: "referral-system-visibility", enabled: false, reason: "TV platform: not supported" },
      { key: "subscription-plan-visibility", enabled: true, reason: "Default ON" },
      { key: "credit-plans-visibility", enabled: true, reason: "Default ON" },
      { key: "in-app-feedback-visibility", enabled: false, reason: "TV platform: not supported" },
      { key: "conditional-feedback-visibility", enabled: false, reason: "Condition not met" },
      { key: "dragon-boat-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "plan-privilege-comparison-table-visibility", enabled: false, reason: "TV platform: not supported", description: "variant_a: red · variant_b: blue · control: yellow" },
      { key: "mooncake-festival-theme-ui", enabled: false, reason: "Outside campaign window" },
      { key: "ipv6-visibility", enabled: true, reason: "Rollout 20% • never-paid? no → forced on (paid)" },
      { key: "task-system-visibility", enabled: false, reason: "TV platform: not supported" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Small UI helpers                                                    */
/* ------------------------------------------------------------------ */
const toneMap = {
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
  neutral: "bg-neutral-100 text-neutral-600 ring-neutral-300",
};

function Pill({ children, tone = "neutral" }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneMap[tone]}`}>
      {children}
    </span>
  );
}

function StatePill({ on, onLabel = "On", offLabel = "Off" }) {
  return on
    ? <Pill tone="emerald">{onLabel}</Pill>
    : <Pill tone="neutral">{offLabel}</Pill>;
}

function DeviceIcon({ type, className }) {
  if (type === "android") return <Smartphone className={className} />;
  if (type === "ios") return <Smartphone className={className} />;
  if (type === "windows") return <Monitor className={className} />;
  if (type === "mac") return <Monitor className={className} />;
  if (type === "androidtv") return <Tv className={className} />;
  return <Cpu className={className} />;
}

function CopyId({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="inline-flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
    >
      {value}
      {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

function SectionCard({ icon: Icon, title, caption, children, right }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-start justify-between border-b border-neutral-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-amber-600" />
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          {caption && <span className="text-xs text-neutral-400">· {caption}</span>}
        </div>
        {right}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function SettingRow({ item }) {
  const [open, setOpen] = useState(false);
  const isList = item.type === "list";
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <div className="flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2">
          {isList && (
            <button onClick={() => setOpen(!open)} className="text-neutral-400 hover:text-neutral-700">
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          <span className="text-sm text-neutral-700">{item.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">changed {item.changed}</span>
          {item.type === "bool"
            ? <StatePill on={item.value === "On"} />
            : <Pill tone={item.tone ?? (isList ? "blue" : "amber")}>{item.value}</Pill>}
        </div>
      </div>
      {isList && open && (
        <div className="mb-2 ml-6 rounded-lg bg-neutral-50 p-2">
          {item.list.map((x) => (
            <div key={x} className="py-0.5 font-mono text-xs text-neutral-600">{x}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */
export default function UserDetailsPage() {
  const m = USER.monetization;
  const statusTone = USER.status === "active" ? "emerald" : USER.status === "banned" ? "rose" : "amber";
  const [activeDevice, setActiveDevice] = useState(0);
  const device = DEVICE_DATA[activeDevice];

  return (
    <div className="min-h-screen bg-neutral-50 p-6 text-neutral-900" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl space-y-5">

        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <span>用户管理 / Users</span><ChevronRight className="h-3 w-3" /><span className="text-neutral-600">User Details</span>
        </div>

        {/* identity header */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-xl font-semibold text-white">
                {USER.email[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span className="text-lg font-semibold">{USER.email}</span>
                  {USER.emailVerified && <Pill tone="emerald">Verified</Pill>}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                  <CopyId value={USER.id} />
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined {USER.registeredAt}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last active {USER.lastActiveAt}</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> via <span className="font-mono">{USER.channel}</span></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Pill tone={statusTone}>{USER.status.toUpperCase()}</Pill>
              <Pill tone="amber">Plan: {m.plan}</Pill>
            </div>
          </div>

          {/* tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3">
            <Tag className="h-3.5 w-3.5 text-neutral-400" />
            {USER.tags.map((t) => <Pill key={t.label} tone={t.tone}>{t.label}</Pill>)}
          </div>
        </div>

        {/* per-device settings & flags */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          {/* device tabs */}
          <div className="flex items-center gap-1 border-b border-neutral-100 px-4 pt-3">
            {DEVICE_DATA.map((d, i) => (
              <button
                key={d.name}
                onClick={() => setActiveDevice(i)}
                className={`flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors
                  ${activeDevice === i
                    ? "border border-b-white border-neutral-200 bg-white text-neutral-900 -mb-px"
                    : "text-neutral-500 hover:text-neutral-700"}`}
              >
                <DeviceIcon type={d.type} className="h-3.5 w-3.5" />
                <div className="text-left">
                  <div>{d.name}</div>
                  <div className="text-[11px] font-normal text-neutral-400">{d.os}</div>
                </div>
              </button>
            ))}
            <div className="ml-auto pb-2 text-xs text-neutral-400">
              last seen <span className="font-mono">{device.lastSeen}</span> · app v{device.app} · RAM {device.totalRam} total / {device.availableMemory} free
            </div>
          </div>

          {/* tab content */}
          <div className="grid grid-cols-1 gap-0 divide-y divide-neutral-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* app settings */}
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-neutral-900">App Settings</h3>
              </div>
              <div className="space-y-4">
                {device.settings.map((grp) => (
                  <div key={grp.group}>
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      <grp.icon className="h-3.5 w-3.5" /> {grp.group}
                    </div>
                    {grp.items.map((it) => <SettingRow key={it.name} item={it} />)}
                  </div>
                ))}
              </div>
            </div>

            {/* feature flags */}
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-neutral-900">Feature Flags</h3>
                <span className="ml-auto text-xs text-neutral-400">
                  {device.flags.filter(f => f.enabled).length}/{device.flags.length} enabled
                </span>
              </div>
              <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight: "calc(9 * 52px)" }}>
                {device.flags.map((f) => (
                  <div key={f.key} className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate font-mono text-xs text-neutral-700">{f.key}</div>
                      <div className="truncate text-[11px] text-neutral-400">{f.description ?? "ON: Visible · OFF: Invisible"}</div>
                    </div>
                    <div className="ml-2 shrink-0">
                      {f.variant
                        ? <Pill tone="violet">{f.variant}</Pill>
                        : <StatePill on={f.enabled} onLabel="ON" offLabel="OFF" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
