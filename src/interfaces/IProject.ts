import { Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
