"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState("18:00");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name || "");
      setEmail(user.email || "");
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(
        settings.notifications !== undefined ? settings.notifications : true
      );
      setReminderTime(settings.reminderTime || "18:00");
    }
  }, []);

  const saveProfile = () => {
    // Update user data
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const updatedUser = { ...user, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    alert("Profile updated successfully!");
  };

  const saveSettings = () => {
    // Save settings to localStorage
    const settings = {
      notifications,
      reminderTime,
    };
    localStorage.setItem("settings", JSON.stringify(settings));

    alert("Settings saved successfully!");
  };

  const resetProgress = () => {
    if (
      confirm(
        "Are you sure you want to reset all your progress? This cannot be undone."
      )
    ) {
      localStorage.removeItem("streak");
      localStorage.removeItem("journalEntries");
      alert("Progress has been reset.");
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <div className="container py-6 space-y-6">
      {/* <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
        </div>
      </div> */}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveProfile}>Save Profile</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive daily reminders and motivational messages
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {notifications && (
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Daily Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme("light")}
                  className={theme === "light" ? "border-primary" : ""}
                >
                  <Sun className="h-5 w-5" />
                  <span className="sr-only">Light theme</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme("dark")}
                  className={theme === "dark" ? "border-primary" : ""}
                >
                  <Moon className="h-5 w-5" />
                  <span className="sr-only">Dark theme</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme("system")}
                  className={theme === "system" ? "border-primary" : ""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                  <span className="sr-only">System theme</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your app data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Reset your progress data, including streaks and journal entries.
              This action cannot be undone.
            </p>
            <Button variant="destructive" onClick={resetProgress}>
              Reset All Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
