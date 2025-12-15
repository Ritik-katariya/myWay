"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ITestimonial } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";
import { Plus, Trash2 } from "lucide-react";

export const TestimonialsSection = forwardRef<SectionHandle>(
  function TestimonialsSection(_props, ref) {
    const [data, setData] = useState<Partial<ITestimonial>[]>([
      {
        name: "",
        designation: "",
        company: "",
        quote: "",
        image: "",
        rating: 5,
        order: 0,
      },
    ]);
    const onChange = (next: Partial<ITestimonial>[]) => setData(next);
    const onAdd = () =>
      setData([
        ...data,
        {
          name: "",
          designation: "",
          quote: "",
          image: "",
          rating: 5,
          order: data.length,
        },
      ]);
    const onRemove = (index: number) =>
      setData(data.filter((_, i) => i !== index));
    useImperativeHandle(ref, () => ({
      save: () => {
        try {
          localStorage.setItem("dashboard.testimonials", JSON.stringify(data));
          console.log("[dashboard] testimonials saved");
        } catch (e) {
          console.error("[dashboard] testimonials save failed", e);
        }
      },
    }));
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Testimonials</h2>
            <p className="text-gray-400">
              Add reviews and feedback from clients
            </p>
          </div>
          <Button
            onClick={onAdd}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
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
                  Testimonial {index + 1}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Name</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].name = e.target.value;
                        onChange(next);
                      }}
                      placeholder="Jane Smith"
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Designation</Label>
                    <Input
                      value={item.designation}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].designation = e.target.value;
                        onChange(next);
                      }}
                      placeholder="CEO"
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Company (Optional)</Label>
                  <Input
                    value={item.company}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].company = e.target.value;
                      onChange(next);
                    }}
                    placeholder="Tech Corp"
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Quote</Label>
                  <Textarea
                    value={item.quote}
                    onChange={(e) => {
                      const next = [...data];
                      next[index].quote = e.target.value;
                      onChange(next);
                    }}
                    placeholder="Write the testimonial quote..."
                    rows={4}
                    className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].image = e.target.value;
                        onChange(next);
                      }}
                      placeholder="https://example.com/avatar.jpg"
                      className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Rating (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={item.rating}
                      onChange={(e) => {
                        const next = [...data];
                        next[index].rating = Number.parseInt(e.target.value);
                        onChange(next);
                      }}
                      className="bg-slate-800/50 border-cyan-500/30 text-white focus:border-cyan-500"
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
