"use client";

import { useState } from "react";
import { FileText, Eye, EyeOff } from "lucide-react";

export default function ChampSecret({ label, valeur }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-neutral-400" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-neutral-400">{label}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-sm text-neutral-900 font-mono tracking-wider">
            {valeur ? (visible ? valeur : "•••  •••  •••") : "—"}
          </p>
          {valeur && (
            <button onClick={() => setVisible(v => !v)}
              className="p-1 text-neutral-300 hover:text-neutral-600 transition-colors">
              {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
