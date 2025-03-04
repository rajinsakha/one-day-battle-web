import Link from "next/link";
import { Button } from "../ui/button";
import { NavItem } from "@/types/dashboard";

export function MobileNavigation({ items }: { items: NavItem[] }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="flex justify-around p-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" size="icon">
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
