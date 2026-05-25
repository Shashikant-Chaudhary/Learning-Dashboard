"use client";

import { motion, type Variants } from "framer-motion";
import { Flame, Target, Clock, TrendingUp } from "lucide-react";

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const stats = [
  { icon: Target, label: "Courses Active", value: "4" },
  { icon: Clock, label: "Hours This Week", value: "12.5" },
  { icon: TrendingUp, label: "Avg Progress", value: "65%" },
];

export default function Profile() {
  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glow-card col-span-1 md:col-span-2 lg:col-span-2
        bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6
        flex flex-col justify-between min-h-[180px]
        hover:border-violet-500/40 transition-colors duration-300 overflow-hidden
        relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full
        bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full
        bg-indigo-600/5 blur-2xl pointer-events-none" />

      {/* Top row */}
      <div className="relative z-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Welcome back</p>
            <h1 className="text-2xl font-semibold text-zinc-100">
              Shashikant 👋
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20
            rounded-full px-3 py-1.5 self-start">
            <Flame size={16} className="text-orange-400 streak-glow" />
            <span className="text-orange-400 text-sm font-medium">12 day streak</span>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mt-2">
          You are on a roll! Keep pushing today goals.
        </p>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mt-6">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
            className="bg-zinc-800/50 rounded-xl p-3 flex flex-col gap-1"
          >
            <Icon size={14} className="text-violet-400" />
            <p className="text-lg font-semibold text-zinc-100">{value}</p>
            <p className="text-xs text-zinc-500">{label}</p>
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}