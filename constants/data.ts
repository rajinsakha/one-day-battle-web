import { NavItem } from "@/types/dashboard";
import {
  Clock,
  BookOpen,
  BarChart2,
  Settings,
 
} from "lucide-react";
export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Clock },
  { href: "/dashboard/journal", label: "Journal", icon: BookOpen },
  { href: "/dashboard/progress", label: "Progress", icon: BarChart2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
