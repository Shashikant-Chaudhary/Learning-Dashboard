"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Code, Server, FileCode, Palette, BookOpen, ArrowRight } from "lucide-react";
import type { Course } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Server,
  FileCode,
  Palette,
  BookOpen,
};

const gradients: Record<string, string> = {
  Code: "from-violet-600/20 via-transparent to-transparent",
  Server: "from-blue-600/20 via-transparent to-transparent",
  FileCode: "from-emerald-600/20 via-transparent to-transparent",
  Palette: "from-pink-600/20 via-transparent to-transparent",
  BookOpen: "from-amber-600/20 via-transparent to-transparent",
};

const iconColors: Record<string, string> = {
  Code: "text-violet-400 bg-violet-600/20 border-violet-500/20",
  Server: "text-blue-400 bg-blue-600/20 border-blue-500/20",
  FileCode: "text-emerald-400 bg-emerald-600/20 border-emerald-500/20",
  Palette: "text-pink-400 bg-pink-600/20 border-pink-500/20",
  BookOpen: "text-amber-400 bg-amber-600/20 border-amber-500/20",
};

const barColors: Record<string, string> = {
  Code: "bg-violet-500",
  Server: "bg-blue-500",
  FileCode: "bg-emerald-500",
  Palette: "bg-pink-500",
  BookOpen: "bg-amber-500",
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

function AnimatedProgressBar({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;
  const gradient = gradients[course.icon_name] ?? gradients.BookOpen;
  const iconColor = iconColors[course.icon_name] ?? iconColors.BookOpen;
  const barColor = barColors[course.icon_name] ?? barColors.BookOpen;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glow-card relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800
        rounded-2xl p-5 flex flex-col gap-4 overflow-hidden
        hover:border-violet-500/30 transition-colors duration-300 cursor-pointer"
    >
      {/* Gradient mesh background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}
        pointer-events-none transition-opacity duration-300
        ${hovered ? "opacity-100" : "opacity-60"}`}
      />

      {/* Icon + Title */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={{ rotate: hovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}
        >
          <Icon size={18} />
        </motion.div>
        <h3 className="text-sm font-medium text-zinc-100 leading-snug">
          {course.title}
        </h3>
      </div>

      {/* Progress */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-500">Progress</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs font-semibold text-zinc-300"
          >
            {course.progress}%
          </motion.span>
        </div>
        <AnimatedProgressBar progress={course.progress} color={barColor} />
      </div>

      {/* Continue button — appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex items-center gap-1 text-xs text-violet-400 font-medium"
      >
        Continue learning <ArrowRight size={12} />
      </motion.div>
    </motion.article>
  );
}