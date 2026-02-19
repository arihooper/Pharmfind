'use client';

import { useState } from "react";
import { Palette } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Switch } from "@/components/ui/switch";

export function AppearanceCard() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [accentColor, setAccentColor] = useState("#10b981");
  const [compactMode, setCompactMode] = useState(false);

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Palette size={20} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Appearance</h3>
      </div>

      {/* Theme Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">Theme</label>
        <div className="flex gap-2">
          {(["light", "dark", "system"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setTheme(option)}
              className={`flex-1 px-4 py-2.5 rounded-xl border transition-all ${
                theme === option
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* accent Color */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer"
          />
          <span className="text-sm text-slate-600 font-mono">{accentColor}</span>
        </div>
      </div>

      {/* compact mode */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-slate-700">Compact Mode</label>
          <p className="text-sm text-slate-500 mt-1">Reduce spacing and padding</p>
        </div>
        <Switch checked={compactMode} onCheckedChange={setCompactMode} />
      </div>
    </GlassCard>
  );
}