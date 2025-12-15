"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ISkill } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";
import { Plus, Trash2 } from "lucide-react";

export const SkillsSection = forwardRef<SectionHandle>(function SkillsSection(
  _props,
  ref
) {
  const [data, setData] = useState<Partial<ISkill>[]>([
    { category: "", skills: [], order: 0 },
  ]);
  const onChange = (next: Partial<ISkill>[]) => setData(next);
  const onAdd = () =>
    setData([...data, { category: "", skills: [], order: data.length }]);
  const onRemove = (index: number) =>
    setData(data.filter((_, i) => i !== index));
  useImperativeHandle(ref, () => ({
    save: () => {
      try {
        localStorage.setItem("dashboard.skills", JSON.stringify(data));
        console.log("[dashboard] skills saved");
      } catch (e) {
        console.error("[dashboard] skills save failed", e);
      }
    },
  }));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
          <p className="text-gray-400">
            List your technical and professional skills
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Category
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                Skill Category {index + 1}
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
                <Label className="text-white">Category Name</Label>
                <Input
                  value={item.category}
                  onChange={(e) => {
                    const next = [...data];
                    next[index].category = e.target.value;
                    onChange(next);
                  }}
                  placeholder="Frontend Development"
                  className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Skills (comma-separated)</Label>
                <Textarea
                  value={item.skills?.join(", ")}
                  onChange={(e) => {
                    const next = [...data];
                    next[index].skills = e.target.value
                      .split(",")
                      .map((s) => s.trim());
                    onChange(next);
                  }}
                  placeholder="React, Vue.js, Angular, TypeScript"
                  rows={3}
                  className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
});
