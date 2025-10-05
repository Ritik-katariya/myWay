"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { dummyTimeline } from "@/lib/dummyData";

interface TimelineEntry {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  date?: Date;
  order: number;
}

export function TimeLine() {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/timeline');
        const data = await response.json();
        
        if (data.success) {
          setTimelineEntries(data.data);
        } else {
          // Fallback to dummy data if API fails
          setTimelineEntries(dummyTimeline);
        }
      } catch (err) {
        console.error('Error fetching timeline:', err);
        setError('Failed to load timeline');
        // Fallback to dummy data
        setTimelineEntries(dummyTimeline);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  // Transform timeline data for Timeline component
  const data = timelineEntries.map(entry => ({
    title: entry.title,
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          {entry.content}
        </p>
        {entry.images && entry.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {entry.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${entry.title} image ${index + 1}`}
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            ))}
          </div>
        )}
      </div>
    ),
  }));
  if (loading) {
    return (
      <div className="relative w-full overflow-clip">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-clip">
      {error && (
        <div className="text-yellow-500 text-sm mb-8 text-center">
          ⚠️ Using demo data - {error}
        </div>
      )}
      <Timeline data={data} />
    </div>
  );
}
