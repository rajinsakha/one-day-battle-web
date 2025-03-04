import { NavItem } from "@/types/dashboard";
import Link from "next/link";
import { Button } from "../ui/button";

export function NavButton({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  return (
    <Link href={item.href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start"
      >
        <item.icon className="mr-2 h-5 w-5" />
        {item.label}
      </Button>
    </Link>
  );
}
