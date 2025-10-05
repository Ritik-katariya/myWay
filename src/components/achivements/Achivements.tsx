"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { dummyAchievements } from "@/lib/dummyData";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconBrandGithub,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconBrandParsinta,
  IconTerminal2,
  IconBrandStackshare,
  IconCertificate,
} from "@tabler/icons-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export function Achivements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/achievements');
        const data = await response.json();
        
        if (data.success) {
          setAchievements(data.data);
        } else {
          // Fallback to dummy data if API fails
          setAchievements(dummyAchievements);
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements');
        // Fallback to dummy data
        setAchievements(dummyAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Transform achievements data for the component
  const features = achievements.map(achievement => ({
    title: achievement.title,
    description: achievement.description,
    icon: achievement.icon ? (
      <span className="text-2xl">{achievement.icon}</span>
    ) : (
      <IconCertificate />
    ),
  }));

  if (loading) {
    return (
      <div className="w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading achievements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-bold text-gray-400 text-4xl sm:text-5xl lg:text-6xl text-center mb-6 tracking-tight relative inline-block">
            Achievements
            {/* Animated underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse group-hover:w-full transition-all duration-700 ease-out"></div>
            {/* Static decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-52 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            {/* Enhanced decorative dots */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div
                className="w-2 h-2 bg-blue-900 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-900 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </h1>
          {error && (
            <div className="text-yellow-500 text-sm mb-4">
              ⚠️ Using demo data - {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 gap-px bg-neutral-200 dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col relative group/feature bg-white dark:bg-black transition-all duration-300 ease-in-out hover:scale-[1.02] hover:z-20",
        "p-8 lg:p-10 min-h-[280px] cursor-pointer",
        // Enhanced shadow and border effects
        "hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
        "border border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/30"
      )}
    >
      {/* Enhanced gradient overlay */}
      <div className="opacity-0 group-hover/feature:opacity-100 transition-all duration-500 absolute inset-0 h-full w-full bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/30 dark:via-transparent dark:to-purple-950/30 pointer-events-none" />

      {/* Icon container with enhanced styling */}
      <div className="mb-6 relative z-10 group-hover/feature:transform group-hover/feature:scale-110 transition-all duration-300 ease-out">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 group-hover/feature:from-blue-100 group-hover/feature:to-purple-100 dark:group-hover/feature:from-blue-900 dark:group-hover/feature:to-purple-900 transition-all duration-300">
          <div className="text-neutral-600 dark:text-neutral-400 group-hover/feature:text-blue-600 dark:group-hover/feature:text-blue-400 transition-colors duration-300">
            {icon}
          </div>
        </div>
      </div>

      {/* Title section with enhanced animations */}
      <div className="text-xl font-bold mb-4 relative z-10 group">
        <div className="absolute -left-4 inset-y-0 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-gradient-to-b group-hover/feature:from-blue-500 group-hover/feature:to-purple-500 transition-all duration-300 group-hover/feature:w-1.5 group-hover/feature:shadow-lg group-hover/feature:shadow-blue-500/50" />

        <span className="group-hover/feature:translate-x-2 transition-all duration-300 ease-out inline-block text-neutral-800 dark:text-neutral-100 group-hover/feature:text-transparent group-hover/feature:bg-clip-text group-hover/feature:bg-gradient-to-r group-hover/feature:from-blue-600 group-hover/feature:to-purple-600 dark:group-hover/feature:from-blue-400 dark:group-hover/feature:to-purple-400">
          {title}
        </span>
      </div>

      {/* Description with enhanced typography */}
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 relative z-10 group-hover/feature:text-neutral-700 dark:group-hover/feature:text-neutral-200 transition-colors duration-300 line-clamp-4">
        {description}
      </p>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent group-hover/feature:via-blue-500/50 transition-all duration-300" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50/0 group-hover/feature:from-blue-500/10 dark:group-hover/feature:from-blue-500/20 to-transparent transition-all duration-500 rounded-bl-full" />
    </div>
  );
};
