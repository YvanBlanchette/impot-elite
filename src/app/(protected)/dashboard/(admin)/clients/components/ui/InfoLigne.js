"use client";

import clsx from "clsx";

export default function InfoLigne({ icone: Icone, label, valeur, link, href }) {
  const inner = (
    <>
      <div className="w-8 h-8 bg-neutral-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-neutral-100 transition-colors">
        <Icone className="w-4 h-4 text-neutral-400" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">{label}</p>
        <p className={clsx(
          "text-sm text-neutral-900 mt-0.5",
          link && "group-hover:text-blue-600 group-hover:underline transition-colors"
        )}>
          {valeur || "—"}
        </p>
      </div>
    </>
  );

  return link ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 py-3 border-b last:border-0 group cursor-pointer">
      {inner}
    </a>
  ) : (
    <div className="flex items-start gap-3 py-3 border-b last:border-0 group">
      {inner}
    </div>
  );
}
