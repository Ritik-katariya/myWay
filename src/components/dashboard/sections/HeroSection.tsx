"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IHero } from "@/types/portfolio";
import { updateHero, createHero, getHero } from "@/server/hero.action";
import type { SectionHandle } from "./SectionHandle";
import { parseResume } from "@/helper/resume-parser";

type HeroSectionProps = {
  onValidityChange?: (valid: boolean) => void;
};

const SOCIAL_PLATFORMS = [
  "LinkedIn",
  "LeetCode",
  "CodeChef",
  "Codeforces",
  "GitHub",
  "Other",
] as const;

export const HeroSection = forwardRef<SectionHandle, HeroSectionProps>(
  function HeroSection(_props: HeroSectionProps, ref) {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [heroData, setHeroData] = useState<IHero>({
      quote: "Where Code, Meets Efficiency.",
      titles: ["", ""],
      description: "",
      resumeUrl: "",
      socialMedia: [{ name: "", url: "" }],
    });

    const onResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          setResumeFile(file);
          const response = await parseResume(file);
          console.log("[v0] Resume file selected:", file.name);
          console.log(response);
        } catch (error) {
          console.error("[v0] Error parsing resume", error);
        }
      }
    };

    const isValid = () => {
      const hasValidQuote =
        heroData.quote.trim().length >= 20 &&
        heroData.quote.trim().length <= 30;
      const titlesFilled =
        heroData.titles.length >= 2 &&
        heroData.titles.length <= 5 &&
        heroData.titles.every((t) => t.trim().length > 0);
      const hasDescription = heroData.description.trim().length > 0;
      const hasResumeUrl = (heroData.resumeUrl ?? "").trim().length > 0;
      const socialValid =
        heroData.socialMedia.length >= 1 &&
        heroData.socialMedia.every(
          (s) => s.name.trim().length > 0 && s.url.trim().length > 0
        );
      return (
        hasValidQuote &&
        titlesFilled &&
        hasDescription &&
        hasResumeUrl &&
        socialValid
      );
    };

    useImperativeHandle(ref, () => ({
      save: async () => {
        try {
          const payload = {
            ...heroData,
          } as IHero & { _id?: string };
          // try to get existing hero
          const existing = await getHero();
          if (existing?.success && existing?.data) {
            const updated = await updateHero({
              _id: (existing.data as any)._id,
              ...payload,
            });
            console.log("[dashboard] hero updated", updated);
          } else {
            const created = await createHero(payload);
            console.log("[dashboard] hero created", created);
          }
        } catch (e) {
          console.error("[dashboard] hero save failed", e);
        }
      },
      isValid,
    }));

    // Get available platforms (not already selected)
    const getAvailablePlatforms = (currentIndex: number) => {
      const selectedPlatforms = heroData.socialMedia
        .map((s, idx) => (idx !== currentIndex ? s.name : null))
        .filter(Boolean);
      return SOCIAL_PLATFORMS.filter((p) => !selectedPlatforms.includes(p));
    };

    // Notify parent about validity changes
    useEffect(() => {
      if (_props.onValidityChange) {
        _props.onValidityChange(isValid());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroData]);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Hero Section & Resume
          </h2>
          <p className="text-gray-400">
            Upload your resume and set up your hero section
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="resume" className="text-white">
            Resume (PDF Optional)
          </Label>
          <div className="relative">
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={onResumeUpload}
              className="hidden"
            />
            <label
              htmlFor="resume"
              className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-cyan-500/30 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 hover:border-cyan-500/50 transition-all cursor-pointer group"
            >
              <Upload className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <p className="text-white font-medium">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
                <p className="text-sm text-gray-400 mt-1">PDF format only</p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quote">Resume Drive Link</Label>
            <Input
              required
              id="RsumeUrl"
              value={heroData.resumeUrl}
              onChange={(e) =>
                setHeroData({ ...heroData, resumeUrl: e.target.value })
              }
              placeholder="Resume Google Drive link"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea
              id="quote"
              value={heroData.quote}
              onChange={(e) =>
                setHeroData({ ...heroData, quote: e.target.value })
              }
              placeholder="Where Code, Meets Efficiency."
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
            <div className="text-xs">
              <span
                className={
                  heroData.quote.length < 20 || heroData.quote.length > 30
                    ? "text-yellow-400"
                    : "text-gray-400"
                }
              >
                {heroData.quote.length}/30 (required 20–30 characters)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Titles (2–5)</Label>
            <div className="space-y-2">
              {heroData.titles.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={t}
                    onChange={(e) => {
                      const next = [...heroData.titles];
                      next[idx] = e.target.value;
                      setHeroData({ ...heroData, titles: next });
                    }}
                    placeholder={`Title ${idx + 1}`}
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (heroData.titles.length <= 2) return;
                      setHeroData({
                        ...heroData,
                        titles: heroData.titles.filter((_, i) => i !== idx),
                      });
                    }}
                    className="border-cyan-500/30 text-white hover:bg-slate-900/70"
                    disabled={heroData.titles.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    if (heroData.titles.length >= 5) return;
                    setHeroData({
                      ...heroData,
                      titles: [...heroData.titles, ""],
                    });
                  }}
                  className="bg-slate-900/50 border border-cyan-500/30 text-white hover:bg-slate-900/70"
                  disabled={heroData.titles.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Title
                </Button>
                <div
                  className={
                    heroData.titles.length < 2 || heroData.titles.length > 5
                      ? "text-yellow-400 text-xs"
                      : "text-gray-400 text-xs"
                  }
                >
                  {heroData.titles.length} titles (required 2–5), Title : Full
                  Stack Developer
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={heroData.description}
              onChange={(e) =>
                setHeroData({ ...heroData, description: e.target.value })
              }
              placeholder="Tell visitors about yourself..."
              rows={4}
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Social Media</Label>
            <div className="space-y-2">
              {heroData.socialMedia.map((s, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-5 gap-2"
                >
                  <Select
                    value={s.name}
                    onValueChange={(value: string) => {
                      const next = [...heroData.socialMedia];
                      next[idx] = { ...next[idx], name: value };
                      setHeroData({ ...heroData, socialMedia: next });
                    }}
                  >
                    <SelectTrigger className="md:col-span-2 w-full bg-slate-900/50 border-cyan-500/30 text-white focus:border-cyan-500">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-cyan-500/30 w-full">
                      {getAvailablePlatforms(idx).map((platform) => (
                        <SelectItem
                          key={platform}
                          value={platform}
                          className="text-white hover:bg-slate-800 focus:bg-slate-800"
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={s.url}
                    onChange={(e) => {
                      const next = [...heroData.socialMedia];
                      next[idx] = { ...next[idx], url: e.target.value };
                      setHeroData({ ...heroData, socialMedia: next });
                    }}
                    placeholder={
                      s.name === "Other"
                        ? "https://example.com/profile"
                        : `Your ${s.name || "profile"} URL`
                    }
                    className="md:col-span-2 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (heroData.socialMedia.length <= 1) return;
                        setHeroData({
                          ...heroData,
                          socialMedia: heroData.socialMedia.filter(
                            (_, i) => i !== idx
                          ),
                        });
                      }}
                      className="w-full border-cyan-500/30 text-white hover:bg-slate-900/70"
                      disabled={heroData.socialMedia.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setHeroData({
                    ...heroData,
                    socialMedia: [
                      ...heroData.socialMedia,
                      { name: "", url: "" },
                    ],
                  })
                }
                className="bg-slate-900/50 border border-cyan-500/30 text-white hover:bg-slate-900/70"
                disabled={heroData.socialMedia.length >= 6}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Social Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
