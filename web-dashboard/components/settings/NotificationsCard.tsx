'use client';

import { useState } from "react";
import { Bell } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NotificationsCard() {
  const [lowStockEnabled, setLowStockEnabled] = useState(true);
  const [threshold, setThreshold] = useState("50");
  const [emailAlerts, setEmailAlerts] = useState(true);
  
  const [inventoryUpdates, setInventoryUpdates] = useState(true);
  const [newOrders, setNewOrders] = useState(true);
  const [systemAnnouncements, setSystemAnnouncements] = useState(false);
  
  const [summaryFrequency, setSummaryFrequency] = useState("daily");
  const [summaryTime, setSummaryTime] = useState("09:00");

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Bell size={20} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
      </div>

      {/* Low Stock Alerts */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Low Stock Alerts</h4>
            <p className="text-sm text-slate-500 mt-1">Get notified when inventory is running low</p>
          </div>
          <Switch checked={lowStockEnabled} onCheckedChange={setLowStockEnabled} />
        </div>
        
        {lowStockEnabled && (
          <div className="space-y-3 ml-0">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs text-slate-600 mb-2">Threshold (units)</label>
                <Input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="rounded-xl border-slate-200 shadow-sm"
                  placeholder="20"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Checkbox
                  id="email-alerts"
                  checked={emailAlerts}
                  onCheckedChange={(checked) => setEmailAlerts(checked as boolean)}
                />
                <label htmlFor="email-alerts" className="text-sm text-slate-700 cursor-pointer">
                  Email
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* where notifications should be sent has to be email*/}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Email Notifications</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Inventory updates</span>
            <Switch checked={inventoryUpdates} onCheckedChange={setInventoryUpdates} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">New orders</span>
            <Switch checked={newOrders} onCheckedChange={setNewOrders} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">System announcements</span>
            <Switch checked={systemAnnouncements} onCheckedChange={setSystemAnnouncements} />
          </div>
        </div>
      </div>

      {/* Summary Report */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Summary Report</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-600 mb-2">Frequency</label>
            <Select value={summaryFrequency} onValueChange={setSummaryFrequency}>
              <SelectTrigger className="w-full rounded-xl border-slate-200 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {summaryFrequency !== "none" && (
            <div>
              <label className="block text-xs text-slate-600 mb-2">Time</label>
              <input
                type="time"
                value={summaryTime}
                onChange={(e) => setSummaryTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}