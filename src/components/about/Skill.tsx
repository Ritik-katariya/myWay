"use client";
import { HoverEffect } from "../ui/card-hover-effect";
import { motion } from "framer-motion";

export function Skill() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-600 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-6xl flex flex-col items-center justify-center gap-3 mb-16"
      >
        My Tech Skills
        <span className="text-gray-500 text-lg md:text-xl font-medium tracking-wide uppercase letter-spacing-wider border-b border-slate-500 pb-2">
          Skills & Technologies
        </span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <HoverEffect items={techSkills} />
      </motion.div>
    </div>
  );
}

export const techSkills = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "C/C++", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL"],
  },
  {
    title: "UI Library / CSS",
    skills: ["Tailwind CSS"],
  },
  {
    title: "Tools",
    skills: ["Git & GitHub"],
  },
  {
    title: "AI & ML",
    skills: ["TensorFlow", "PyTorch"], // placeholder examples, add your own
  },
  {
    title: "Operating Systems",
    skills: ["Linux", "Windows"], // placeholder examples, add your own
  },
];
