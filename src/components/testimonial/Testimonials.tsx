"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useEffect, useState } from "react";
import { dummyTestimonials } from "@/lib/dummyData";

interface Testimonial {
  _id?: string;
  name: string;
  designation: string;
  company?: string;
  quote: string;
  image: string;
  rating?: number;
  order: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        
        if (data.success) {
          setTestimonials(data.data);
        } else {
          // Fallback to dummy data if API fails
          setTestimonials(
            dummyTestimonials.map((t, idx) => ({
              ...t,
              _id: `dummy-${idx}`,
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        // Fallback to dummy data
        setTestimonials(
          dummyTestimonials.map((t, idx) => ({
            ...t,
            _id: `dummy-${idx}`,
          }))
        );
        // Fallback to dummy data
        setTestimonials(dummyTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Transform testimonials data for AnimatedTestimonials component
  const formattedTestimonials = testimonials.map(testimonial => ({
    quote: testimonial.quote,
    name: testimonial.name,
    designation: testimonial.designation,
    src: testimonial.image,
  }));
  if (loading) {
    return (
      <div>
        <div className="text-center mb-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="font-bold text-gray-400 text-4xl sm:text-5xl lg:text-6xl text-center mb-6 tracking-tight relative inline-block">
          Testimonials
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
      <AnimatedTestimonials testimonials={formattedTestimonials} />
    </div>
  );
}
