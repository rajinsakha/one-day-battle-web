"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, BarChart2, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-background px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Clock className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">One Day Battle</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <nav className="flex-1 space-y-1 p-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/journal">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-5 w-5" />
                Journal
              </Button>
            </Link>
            <Link href="/dashboard/progress">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart2 className="mr-2 h-5 w-5" />
                Progress
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background">
        <nav className="flex justify-around p-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <Clock className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Button>
          </Link>
          <Link href="/dashboard/journal">
            <Button variant="ghost" size="icon">
              <BookOpen className="h-5 w-5" />
              <span className="sr-only">Journal</span>
            </Button>
          </Link>
          <Link href="/dashboard/progress">
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-5 w-5" />
              <span className="sr-only">Progress</span>
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
