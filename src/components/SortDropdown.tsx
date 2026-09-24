"use client";

import { ChevronDown } from "lucide-react";
import type { SortKey } from "@/lib/types";
import { SORT_OPTIONS } from "@/lib/types";

interface SortDropdownProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        Sort By
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="w-full appearance-none rounded-lg border border-border bg-surface py-1.5 pl-3 pr-8 text-sm font-semibold uppercase tracking-wide text-text focus:border-accent focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
