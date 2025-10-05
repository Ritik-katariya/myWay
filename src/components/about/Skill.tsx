"use client";
import { HoverEffect } from "../ui/card-hover-effect";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { dummySkills } from "@/lib/dummyData";

interface Skill {
  _id: string;
  category: string;
  skills: string[];
  order: number;
}

export function Skill() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/skills');
        const data = await response.json();
        
        if (data.success) {
          setSkills(data.data);
        } else {
          // Fallback to dummy data if API fails
          setSkills(dummySkills);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills');
        // Fallback to dummy data
        setSkills(dummySkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Transform skills data for HoverEffect component
  const techSkills = skills.map(skill => ({
    title: skill.category,
    skills: skill.skills
  }));

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

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
      
      {error && (
        <div className="text-yellow-500 text-sm mb-8 text-center">
          ⚠️ Using demo data - {error}
        </div>
      )}
      
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
