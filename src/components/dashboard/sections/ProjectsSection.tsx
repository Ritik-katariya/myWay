"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IProject } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";
import { Plus, Trash2 } from "lucide-react";

export const ProjectsSection = forwardRef<SectionHandle>(
  function ProjectsSection(_props, ref) {
    const [data, setData] = useState<Partial<IProject>[]>([
      {
        title: "",
        description: "",
        longDescription: "",
        image: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        category: "web",
        status: "completed",
        featured: false,
        order: 0,
      },
    ]);
    const onChange = (next: Partial<IProject>[]) => setData(next);
    const onAdd = () =>
      setData([
        ...data,
        {
          title: "",
          description: "",
          image: "",
          technologies: [],
          category: "web",
          status: "completed",
          featured: false,
          order: data.length,
        },
      ]);
    const onRemove = (index: number) =>
      setData(data.filter((_, i) => i !== index));
    useImperativeHandle(ref, () => ({
      save: () => {
        try {
          localStorage.setItem("dashboard.projects", JSON.stringify(data));
          console.log("[dashboard] projects saved");
        } catch (e) {
          console.error("[dashboard] projects save failed", e);
        }
      },
    }));
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
            <p className="text-gray-400">Display your best work and projects</p>
          </div>
          <Button
            onClick={onAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-slate-900/50 border-cyan-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">
                  Project {index + 1}
                </h3>
                {data.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].title = e.target.value;
                      onChange(next);
                    }}
                    placeholder="E-commerce Platform"
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Short Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].description = e.target.value;
                      onChange(next);
                    }}
                    placeholder="Brief description of the project..."
                    rows={2}
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">
                    Long Description (Optional)
                  </Label>
                  <Textarea
                    value={item.longDescription}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].longDescription = e.target.value;
                      onChange(next);
                    }}
                    placeholder="Detailed description..."
                    rows={3}
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Main Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].image = e.target.value;
                        onChange(next);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Category</Label>
                    <select
                      title="Category"
                      value={item.category}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].category = e.target.value as any;
                        onChange(next);
                      }}
                      className="w-full h-10 px-3 rounded-md bg-slate-800/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="desktop">Desktop</option>
                      <option value="ai">AI</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Status</Label>
                    <select
                      title="Status"
                      value={item.status}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].status = e.target.value as any;
                        onChange(next);
                      }}
                      className="w-full h-10 px-3 rounded-md bg-slate-800/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <input
                        title="Featured Project"
                        type="checkbox"
                        checked={!!item.featured}
                        onChange={(e) => {
                          const next = [...data];
                          next[index].featured = e.target.checked;
                          onChange(next);
                        }}
                        className="w-4 h-4 rounded border-cyan-500/30 bg-slate-800/50 text-cyan-500 focus:ring-cyan-500"
                      />
                      Featured Project
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">
                    Technologies (comma-separated)
                  </Label>
                  <Input
                    value={item.technologies?.join(", ")}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].technologies = e.target.value
                        .split(",")
                        .map((t) => t.trim());
                      onChange(next);
                    }}
                    placeholder="React, Node.js, MongoDB"
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">GitHub URL (Optional)</Label>
                    <Input
                      value={item.githubUrl}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].githubUrl = e.target.value;
                        onChange(next);
                      }}
                      placeholder="https://github.com/..."
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Live URL (Optional)</Label>
                    <Input
                      value={item.liveUrl}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].liveUrl = e.target.value;
                        onChange(next);
                      }}
                      placeholder="https://project.com"
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);
