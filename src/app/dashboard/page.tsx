"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  FileText,
  Clock,
  Award,
  Briefcase,
  Code,
  MessageSquare,
  Mail,
  Upload,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  IHero,
  IAbout,
  ITimeline,
  IAchievement,
  IProject,
  ISkill,
  ITestimonial,
  IContact,
  SectionType,
} from "@/types/portfolio";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { HeroSection } from "@/components/dashboard/sections/HeroSection";
import { AboutSection } from "@/components/dashboard/sections/AboutSection";
import { TimelineSection } from "@/components/dashboard/sections/TimelineSection";
import { AchievementsSection } from "@/components/dashboard/sections/AchievementsSection";
import { ProjectsSection } from "@/components/dashboard/sections/ProjectsSection";
import { SkillsSection } from "@/components/dashboard/sections/SkillsSection";
import { TestimonialsSection } from "@/components/dashboard/sections/TestimonialsSection";
import { ContactSection } from "@/components/dashboard/sections/ContactSection";
import type { SectionHandle } from "@/components/dashboard/sections/SectionHandle";

const sections = [
  { id: "hero", label: "Hero & Resume", icon: User },
  { id: "about", label: "About", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export default function PortfolioDashboard() {
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  const sectionRef = useRef<SectionHandle | null>(null);
  const [isCurrentValid, setIsCurrentValid] = useState<boolean>(false);

  const handleNext = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id as SectionType);
    }
  };

  const handleSave = () => {
    try {
      sectionRef.current?.save();
    } catch (e) {
      console.error("[dashboard] save failed", e);
    }
  };

  const handleSubmit = () => {
    console.log("[v0] Submitting all portfolio data");
    // In a real app, you'd submit all data to the server
  };

  const handlePreview = () => {
    console.log("[v0] Opening preview");
    // In a real app, you'd open a preview of the portfolio
  };

  const renderForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <HeroSection
            ref={sectionRef}
            onValidityChange={(v: boolean) => setIsCurrentValid(v)}
          />
        );
      case "about":
        return <AboutSection ref={sectionRef} />;
      case "timeline":
        return <TimelineSection ref={sectionRef} />;
      case "achievements":
        return <AchievementsSection ref={sectionRef} />;
      case "projects":
        return <ProjectsSection ref={sectionRef} />;
      case "skills":
        return <SkillsSection ref={sectionRef} />;
      case "testimonials":
        return <TestimonialsSection ref={sectionRef} />;
      case "contact":
        return <ContactSection ref={sectionRef} />;
      default:
        return null;
    }
  };

  const isLastSection = activeSection === "contact";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020618] via-[#0a1628] to-[#020618]">
      <div className="flex h-screen">
        <Sidebar
          sections={sections as any}
          activeSection={activeSection}
          onSelect={(s) => setActiveSection(s)}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {renderForm()}

            <div className="flex items-center justify-end mt-8 pt-6 border-t border-cyan-500/20">
              <Button
                onClick={() => {
                  try {
                    sectionRef.current?.save();
                  } catch (e) {
                    console.error("[dashboard] save failed", e);
                  }
                  if (!isLastSection) {
                    handleNext();
                  }
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                disabled={isLastSection || !isCurrentValid}
              >
                Save & Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
