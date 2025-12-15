import { CardSpotlight } from "@/components/ui/card-spotlight";
import Image from "next/image";
import placeholderImage from "../../../public/project.jpg";



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

interface CardProps {
  project: Project;
}

export function Card({ project }: CardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'planned':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="relative max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={project.image || placeholderImage}
          alt={project.title}
          width={300}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`${getStatusColor(project.status)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
            {getStatusText(project.status)}
          </span>
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 left-2">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>
      
      {/* Content Container */}
      <CardSpotlight className="h-60 w-full p-6">
        <p className="text-xl font-bold relative z-20 text-white mb-3">
          {project.title}
        </p>
        
        <div className="text-neutral-300 text-sm mb-4 relative z-20 leading-relaxed">
          {project.description}
        </div>
        
        {/* Tech Stack Tags */}
        <div className="relative z-20">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full mr-2 mb-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 cursor-pointer hover:scale-105 shadow-md capitalize"
            >
              {tech.toLowerCase()}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block bg-gray-600 text-white text-xs px-3 py-1.5 rounded-full mr-2 mb-2">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="relative z-20 mt-4 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg transition-colors duration-200 text-center"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition-colors duration-200 text-center"
            >
              Live Demo
            </a>
          )}
        </div>
      </CardSpotlight>
    </div>
  );
}