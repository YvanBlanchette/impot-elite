"use client";

export default function Section({ titre, icone: Icone, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Icone className="w-3.5 h-3.5 text-neutral-400" />
        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{titre}</p>
      </div>
      <div className="bg-neutral-50 rounded-xl px-3">
        {children}
      </div>
    </div>
  );
}
