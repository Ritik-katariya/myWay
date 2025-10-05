"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function BookModal() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button >
          Book a Call
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        align="end" // aligns right side
        side="bottom" // opens below button
      >
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Share link</h4>
          <p className="text-sm text-muted-foreground">
            Anyone with this link will be able to view it.
          </p>
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <button className="px-3 py-1 text-sm border rounded">
            Close
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
