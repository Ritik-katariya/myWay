"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Eye, Star } from "lucide-react";

export interface Portfolio {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  projectCount: number;
  likes: number;
  views: number;
  rating: number;
  featured?: boolean;
  portfolioUrl?: string;
  location?: string;
  experience?: string;
}

interface PortfolioCardProps {
  portfolio: Portfolio;
  onLike?: (id: string) => void;
  onView?: (id: string) => void;
}

export function PortfolioCard({
  portfolio,
  onLike,
  onView,
}: PortfolioCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(portfolio.id);
  };

  const handleView = () => {
    onView?.(portfolio.id);
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-[0_6px_24px_rgba(6,182,212,0.15)] border-cyan-500/20 bg-[#0a1628]/70 backdrop-blur-sm ${
        portfolio.featured ? "ring-2 ring-cyan-500/30" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {portfolio.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-cyan-600 text-white border border-cyan-500/50">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16 ring-2 ring-cyan-500/20 transition-all duration-300 group-hover:ring-cyan-400/40">
            <AvatarImage
              src={portfolio.avatar || "/placeholder.svg"}
              alt={portfolio.name}
            />
            <AvatarFallback className="bg-cyan-700 text-white text-lg font-semibold">
              {portfolio.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-white group-hover:text-cyan-300 transition-colors duration-200 truncate">
              {portfolio.name}
            </h3>
            {portfolio.location && (
              <p className="text-sm text-white/60">{portfolio.location}</p>
            )}
            {portfolio.experience && (
              <p className="text-xs text-white/50">{portfolio.experience}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
          {portfolio.bio}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {portfolio.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 hover:bg-cyan-500/15 transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {portfolio.skills.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs text-white/60 border-cyan-500/20"
              >
                +{portfolio.skills.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-white/60">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="font-medium text-white">
                {portfolio.projectCount}
              </span>
              <span>projects</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{portfolio.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{portfolio.rating}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`transition-all duration-200 ${
              isLiked
                ? "text-red-400 hover:text-red-500"
                : "text-white/60 hover:text-red-400"
            }`}
          >
            <Heart
              className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`}
            />
            {portfolio.likes + (isLiked ? 1 : 0)}
          </Button>

          <Button
            size="sm"
            onClick={handleView}
            className={`transition-all duration-300 ${
              isHovered
                ? "bg-sky-800 hover:bg-sky-700 shadow-[0_0_16px_rgba(6,182,212,0.25)]"
                : "bg-sky-800 hover:bg-sky-700"
            } text-white`}
          >
            View Portfolio
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
