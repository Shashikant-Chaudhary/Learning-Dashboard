"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function GridClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="grid gap-4 p-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}