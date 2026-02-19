'use client';

import { useState } from "react";
import { Shield, X } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SecurityCard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sessions = [
    { id: 1, device: "Chrome on Windows", location: "Dambi Dollo, ET", lastActive: "2 mins ago", current: true },
  ];

  return (
    <GlassCard>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Shield size={20} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Security</h3>
      </div>

      {/* phange Password */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Change Password</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <Input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-xl border-slate-200 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-xl border-slate-200 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-xl border-slate-200 shadow-sm"
            />
          </div>
        </div>
        <Button variant="outline" className="mt-4 w-full rounded-xl">
          Update Password
        </Button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h4>
            <p className="text-sm text-slate-500 mt-1">Add an extra layer of security</p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>
      </div>

      {/* session management */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Active Sessions</h4>
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{session.device}</p>
                  {session.current && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{session.location} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                  <X size={16} className="text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}