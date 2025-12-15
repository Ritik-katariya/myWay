"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IAbout } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";

export const AboutSection = forwardRef<SectionHandle>(function AboutSection(
  _props,
  ref
) {
  const [aboutData, setAboutData] = useState<IAbout>({
    bio: "",
    yearsOfExperience: 0,
    location: "",
    email: "",
    phone: "",
    socialLinks: { github: "", linkedin: "", twitter: "", website: "" },
  });
  useImperativeHandle(ref, () => ({
    save: () => {
      try {
        localStorage.setItem("dashboard.about", JSON.stringify(aboutData));
        console.log("[dashboard] about saved");
      } catch (e) {
        console.error("[dashboard] about save failed", e);
      }
    },
  }));
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">About Section</h2>
        <p className="text-gray-400">
          Tell your story and share your background
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio" className="text-white">
            Bio
          </Label>
          <Textarea
            id="bio"
            value={aboutData.bio}
            onChange={(e) =>
              setAboutData({ ...aboutData, bio: e.target.value })
            }
            placeholder="Write your professional bio..."
            rows={6}
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-white">
              Years of Experience
            </Label>
            <Input
              id="experience"
              type="number"
              value={aboutData.yearsOfExperience}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  yearsOfExperience: Number.parseInt(e.target.value),
                })
              }
              placeholder="5"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-white">
              Location
            </Label>
            <Input
              id="location"
              value={aboutData.location}
              onChange={(e) =>
                setAboutData({ ...aboutData, location: e.target.value })
              }
              placeholder="San Francisco, CA"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="aboutEmail" className="text-white">
              Email
            </Label>
            <Input
              id="aboutEmail"
              type="email"
              value={aboutData.email}
              onChange={(e) =>
                setAboutData({ ...aboutData, email: e.target.value })
              }
              placeholder="john@example.com"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutPhone" className="text-white">
              Phone
            </Label>
            <Input
              id="aboutPhone"
              value={aboutData.phone}
              onChange={(e) =>
                setAboutData({ ...aboutData, phone: e.target.value })
              }
              placeholder="+1 (555) 123-4567"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-white">Social Links</Label>
          <div className="space-y-3">
            <Input
              value={aboutData.socialLinks?.github}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  socialLinks: {
                    ...aboutData.socialLinks,
                    github: e.target.value,
                  },
                })
              }
              placeholder="GitHub URL"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
            <Input
              value={aboutData.socialLinks?.linkedin}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  socialLinks: {
                    ...aboutData.socialLinks,
                    linkedin: e.target.value,
                  },
                })
              }
              placeholder="LinkedIn URL"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
            <Input
              value={aboutData.socialLinks?.twitter}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  socialLinks: {
                    ...aboutData.socialLinks,
                    twitter: e.target.value,
                  },
                })
              }
              placeholder="Twitter URL"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
            <Input
              value={aboutData.socialLinks?.website}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  socialLinks: {
                    ...aboutData.socialLinks,
                    website: e.target.value,
                  },
                })
              }
              placeholder="Website URL"
              className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
