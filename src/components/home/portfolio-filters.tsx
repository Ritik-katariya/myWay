"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ChevronDown } from "lucide-react";

const filterCategories = [
  { id: "all", label: "All", count: 1247 },
  { id: "web", label: "Web", count: 456 },
  { id: "mobile", label: "Mobile", count: 234 },
  { id: "design", label: "Design", count: 189 },
  { id: "fullstack", label: "Full Stack", count: 167 },
];



interface PortfolioFiltersProps {
  onFilterChange: (filters: { category: string; skills: string[] }) => void;
}

export function PortfolioFilters({ onFilterChange }: PortfolioFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onFilterChange({ category: categoryId, skills: selectedSkills });
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(newSkills);
    onFilterChange({ category: activeCategory, skills: newSkills });
  };

  const clearAllFilters = () => {
    setActiveCategory("all");
    setSelectedSkills([]);
    onFilterChange({ category: "all", skills: [] });
  };

  return (
    <div
      className={`sticky top-16 z-40  backdrop-blur-md border-b border-cyan-500/20 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-white/90 hover:text-cyan-400 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </Button>

            {!isExpanded &&
              (activeCategory !== "all" || selectedSkills.length > 0) && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-cyan-500/15 text-cyan-300 border border-cyan-500/20"
                >
                  {(activeCategory !== "all" ? 1 : 0) + selectedSkills.length}{" "}
                  active
                </Badge>
              )}
          </div>

          {(activeCategory !== "all" || selectedSkills.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-white/60 hover:text-white text-xs transition-colors duration-200"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`transition-all duration-200 will-change-transform ${
                    activeCategory === category.id
                      ? "bg-cyan-600 text-white border-cyan-500/60 hover:bg-cyan-500"
                      : "border-cyan-500/30 text-white/80 hover:border-cyan-400/50 hover:text-cyan-300"
                  } hover:translate-y-[-1px]`}
                >
                  {category.label}
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-cyan-500/10 text-cyan-200 border border-cyan-500/20"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

          
          </div>
        )}
      </div>
    </div>
  );
}
