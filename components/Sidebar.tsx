"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Courses" },
  { icon: Trophy, label: "Achievements" },
  { icon: Settings, label: "Settings" },
];

function DesktopSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <nav
      className={`
        relative hidden md:flex flex-col gap-1 bg-zinc-900/80 backdrop-blur-sm
        border-r border-zinc-800 transition-all duration-300 ease-in-out p-4
        ${collapsed ? "w-16" : "w-56"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center
          justify-center shrink-0 shadow-lg shadow-violet-500/25">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm text-zinc-100 whitespace-nowrap
            tracking-wide">
            LearnOS
          </span>
        )}
      </div>

      {/* Nav items */}
      {navItems.map(({ icon: Icon, label }) => (
        <button
          type="button"
          key={label}
          onClick={() => setActive(label)}
          className={`
            relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
            w-full text-left z-10 transition-colors duration-150
            ${active === label
              ? "text-violet-300"
              : "text-zinc-500 hover:text-zinc-200"
            }
          `}
        >
          {active === label && (
            <motion.div
              layoutId="sidebar-highlight"
              className="absolute inset-0 bg-violet-600/15 rounded-xl
                border border-violet-500/20"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon size={17} className="shrink-0 relative z-10" />
          {!collapsed && (
            <span className="whitespace-nowrap relative z-10 font-medium">
              {label}
            </span>
          )}
        </button>
      ))}

      {/* Bottom: avatar */}
      {!collapsed && (
        <div className="mt-auto pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br
              from-violet-500 to-indigo-600 flex items-center justify-center
              text-xs font-bold text-white shrink-0">
              SC
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-zinc-200 truncate">
                Shashikant Chaudhary
              </span>
              <span className="text-[10px] text-zinc-500 truncate">
                Pro Plan
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-zinc-800 border
          border-zinc-700 rounded-full items-center justify-center text-zinc-400
          hover:text-zinc-100 transition-colors hidden lg:flex"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </nav>
  );
}

function MobileNav() {
  const [active, setActive] = useState("Dashboard");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50
      bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800
      flex justify-around items-center px-2 py-2">
      {navItems.map(({ icon: Icon, label }) => (
        <button
          type="button"
          key={label}
          onClick={() => setActive(label)}
          aria-label={label}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5
            rounded-xl text-xs transition-colors w-full"
        >
          {active === label && (
            <motion.div
              layoutId="mobile-highlight"
              className="absolute inset-0 bg-violet-600/20 rounded-xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon
            size={20}
            className={`relative z-10 transition-colors ${
              active === label ? "text-violet-400" : "text-zinc-500"
            }`}
          />
          <span
            className={`relative z-10 transition-colors font-medium ${
              active === label ? "text-violet-400" : "text-zinc-500"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileNav />
    </>
  );
}