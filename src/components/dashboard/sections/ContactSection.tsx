"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { IContact } from "@/types/portfolio";
import type { SectionHandle } from "./SectionHandle";

export const ContactSection = forwardRef<SectionHandle>(function ContactSection(
  _props,
  ref
) {
  const [data, setData] = useState<IContact>({
    email: "",
    phone: "",
    address: "",
    availability: "",
  });
  const onChange = (next: IContact) => setData(next);
  useImperativeHandle(ref, () => ({
    save: () => {
      try {
        localStorage.setItem("dashboard.contact", JSON.stringify(data));
        console.log("[dashboard] contact saved");
      } catch (e) {
        console.error("[dashboard] contact save failed", e);
      }
    },
  }));
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Contact Information
        </h2>
        <p className="text-gray-400">How can people reach you?</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="text-white">
            Email
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="contact@example.com"
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="text-white">
            Phone (Optional)
          </Label>
          <Input
            id="contactPhone"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-white">
            Address (Optional)
          </Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            placeholder="123 Main St, City, State, ZIP"
            rows={3}
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability" className="text-white">
            Availability
          </Label>
          <Input
            id="availability"
            value={data.availability}
            onChange={(e) =>
              onChange({ ...data, availability: e.target.value })
            }
            placeholder="Available for freelance work"
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );
});
