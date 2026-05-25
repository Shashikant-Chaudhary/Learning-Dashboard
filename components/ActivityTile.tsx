"use client";

import { motion, type Variants } from "framer-motion";

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const activityData = [
  [3, 1, 2, 0, 3, 1, 2],
  [1, 2, 3, 2, 1, 0, 3],
  [2, 0, 1, 3, 2, 1, 0],
  [0, 3, 2, 1, 0, 3, 2],
  [1, 2, 0, 3, 1, 2, 3],
  [3, 1, 2, 0, 2, 1, 3],
  [2, 3, 1, 2, 0, 3, 1],
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

const colors = [
  "bg-zinc-800",
  "bg-violet-900/60",
  "bg-violet-600/70",
  "bg-violet-500",
];

export default function ActivityTile() {
  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glow-card col-span-1 bg-zinc-900/80 backdrop-blur-sm border
        border-zinc-800 rounded-2xl p-5 hover:border-violet-500/40
        hover:shadow-lg hover:shadow-violet-500/5 transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-zinc-300">Activity</h2>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">
          Last 7 weeks
        </span>
      </div>

      <div className="flex gap-1.5 mt-2">
  {/* Day labels */}
  <div className="flex flex-col gap-1 mr-1">
    {days.map((d, i) => (
      <span key={i} className="text-[10px] text-zinc-600 h-3 flex items-center">
        {d}
      </span>
    ))}
  </div>
  {/* Grid — remove overflow-x-auto on desktop */}
  <div className="flex gap-1">
    {activityData.map((week, wi) => (
      <div key={wi} className="flex flex-col gap-1">
        {week.map((level, di) => (
          <motion.div
            key={di}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: wi * 0.05 + di * 0.02, type: "spring" }}
            whileHover={{ scale: 1.5 }}
            className={`w-3 h-3 rounded-sm cursor-pointer ${colors[level]}`}
          />
        ))}
      </div>
    ))}
  </div>
</div>
      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="text-[10px] text-zinc-600">Less</span>
        {colors.map((c, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
        ))}
        <span className="text-[10px] text-zinc-600">More</span>
      </div>
    </motion.article>
  );
}