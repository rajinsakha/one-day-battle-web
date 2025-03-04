"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import { navItems } from "@/constants/data";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavButton } from "@/components/navigation/NavButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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

  const getPageTitle = () => {
    const currentNavItem = navItems.find((item) => item.href === pathname);
    return currentNavItem ? currentNavItem.label : "Dashboard";
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col fixed h-full">
        <div className="h-15 flex items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center justify-center">
            <Clock className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">One Day Battle</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavButton
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </nav>
        <div className="p-4 border-t flex items-center justify-between">
          <ThemeToggle />
          <LogoutButton onClick={handleLogout} />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-background border-b h-15 flex items-center px-4 fixed w-[calc(100%-16rem)] z-10">
          <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 mt-16">{children}</main>
      </div>

      {/* Mobile navigation */}
      <MobileNavigation items={navItems} />
    </div>
  );
}

function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Log out</span>
    </Button>
  );
}
