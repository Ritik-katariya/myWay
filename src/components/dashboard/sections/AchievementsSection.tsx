"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IAchievement } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";
import { Plus, Trash2 } from "lucide-react";

export const AchievementsSection = forwardRef<SectionHandle>(
  function AchievementsSection(_props, ref) {
    const [data, setData] = useState<Partial<IAchievement>[]>([
      { title: "", description: "", icon: "", order: 0 },
    ]);
    const onAdd = () =>
      setData([
        ...data,
        { title: "", description: "", icon: "", order: data.length },
      ]);
    const onRemove = (index: number) =>
      setData(data.filter((_, i) => i !== index));
    const onChange = (next: Partial<IAchievement>[]) => setData(next);
    useImperativeHandle(ref, () => ({
      save: () => {
        try {
          localStorage.setItem("dashboard.achievements", JSON.stringify(data));
          console.log("[dashboard] achievements saved");
        } catch (e) {
          console.error("[dashboard] achievements save failed", e);
        }
      },
    }));
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
            <p className="text-gray-400">
              Showcase your accomplishments and awards
            </p>
          </div>
          <Button
            onClick={onAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
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
                  Achievement {index + 1}
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
                    placeholder="Best Developer Award 2024"
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].description = e.target.value;
                      onChange(next);
                    }}
                    placeholder="Describe your achievement..."
                    rows={3}
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Icon (Optional)</Label>
                  <Input
                    value={item.icon}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].icon = e.target.value;
                      onChange(next);
                    }}
                    placeholder="trophy, award, star"
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);
