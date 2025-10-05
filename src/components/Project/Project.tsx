'use client';
import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { dummyProjects } from '@/lib/dummyData';

interface Project {
  _id: string;
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
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data);
        } else {
          // Fallback to dummy data if API fails
          setProjects(dummyProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        // Fallback to dummy data
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="font-bold text-gray-400 text-4xl sm:text-5xl lg:text-6xl text-center mb-6 tracking-tight relative inline-block">
          Projects
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse group-hover:w-full transition-all duration-700 ease-out"></div>
          {/* Static decorative underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-44 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          {/* Enhanced decorative dots */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div
              className="w-2 h-2 bg-blue-900 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-sky-800 rounded-full animate-bounce"
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full min-h-screen mb-20 px-28 pl-32'>
        {projects.map((project) => (
          <Card key={project._id || project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
