'use client';

import { useState } from "react";
import { Clock } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Checkbox } from "@/components/ui/checkbox";

export function PharmacyOperationsCard() {
  const [weekdaysOpen, setWeekdaysOpen] = useState("09:00");
  const [weekdaysClose, setWeekdaysClose] = useState("18:00");
  const [weekdaysClosed, setWeekdaysClosed] = useState(false);
  
  const [sundayOpen, setSundayOpen] = useState("09:00");
  const [sundayClose, setSundayClose] = useState("18:00");
  const [sundayClosed, setSundayClosed] = useState(true);

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Clock size={20} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Pharmacy Operations</h3>
      </div>

      {/* work Hours */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Business Hours</h4>
        
        {/* Monday - Saturday */}
        <div className="mb-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700">Monday – Saturday</label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="weekdays-closed"
                checked={weekdaysClosed}
                onCheckedChange={(checked) => setWeekdaysClosed(checked as boolean)}
              />
              <label htmlFor="weekdays-closed" className="text-sm text-slate-600 cursor-pointer">
                Closed
              </label>
            </div>
          </div>
          {!weekdaysClosed && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Opening Time</label>
                <input
                  type="time"
                  value={weekdaysOpen}
                  onChange={(e) => setWeekdaysOpen(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Closing Time</label>
                <input
                  type="time"
                  value={weekdaysClose}
                  onChange={(e) => setWeekdaysClose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sunday */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700">Sunday</label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="sunday-closed"
                checked={sundayClosed}
                onCheckedChange={(checked) => setSundayClosed(checked as boolean)}
              />
              <label htmlFor="sunday-closed" className="text-sm text-slate-600 cursor-pointer">
                Closed
              </label>
            </div>
          </div>
          {!sundayClosed && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Opening Time</label>
                <input
                  type="time"
                  value={sundayOpen}
                  onChange={(e) => setSundayOpen(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Closing Time</label>
                <input
                  type="time"
                  value={sundayClose}
                  onChange={(e) => setSundayClose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}