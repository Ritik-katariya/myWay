import type { Document } from "mongoose";

export interface IHero {
  quote: string;
  titles: string[];
  description: string;
  resumeUrl?: string;
  socialMedia: { name: string; url: string }[];
}

export interface IAbout {
  bio: string;
  yearsOfExperience?: number;
  location?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface IAchievement extends Document {
  title: string;
  description: string;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "web" | "mobile" | "desktop" | "ai" | "other";
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkill extends Document {
  category: string;
  skills: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  company?: string;
  quote: string;
  image: string;
  rating?: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimeline extends Document {
  title: string;
  content: string;
  images?: string[];
  date?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact {
  email: string;
  phone?: string;
  address?: string;
  availability?: string;
}

export type SectionType =
  | "hero"
  | "about"
  | "timeline"
  | "achievements"
  | "projects"
  | "skills"
  | "testimonials"
  | "contact";
