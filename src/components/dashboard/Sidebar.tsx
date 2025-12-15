"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import type { SectionType } from "@/types/portfolio";

export type SectionItem = {
  id: SectionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface SidebarProps {
  sections: readonly SectionItem[];
  activeSection: SectionType;
  onSelect: (section: SectionType) => void;
}

export function Sidebar({ sections, activeSection, onSelect }: SidebarProps) {
  return (
    <div className="w-72 border-r border-cyan-500/20 bg-slate-900/30 backdrop-blur-sm p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Portfolio Dashboard
        </h1>
        <p className="text-sm text-gray-400">Manage your portfolio content</p>
      </div>

      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                activeSection === section.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
