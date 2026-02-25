"use client";

import { Label } from "@/components/ui/label";

export default function SelectField({ label, value, onChange, children }) {
  return (
    <div>
      <Label className="text-xs text-neutral-500 mb-1">{label}</Label>
      <select value={value} onChange={onChange}
        className="w-full text-sm px-3 py-2 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-[#006838]">
        {children}
      </select>
    </div>
  );
}
