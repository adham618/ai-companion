"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      pro: false,
    },
    {
      href: "/companion/create",
      label: "Create",
      icon: Plus,
      pro: true,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      pro: false,
    },
  ];
  const onNavigate = (href: string, pro: boolean) => {
    // TODO check if pro route
    // Navigate to the route
    return router.push(href);
  };
  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary text-primary">
      <div className="flex flex-1 justify-center p-1">
        <div className="space-y-2">
          {routes.map((route) => (
            <button
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                "group flex w-full flex-1 flex-col items-center justify-start gap-y-2 rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
                pathname === route.href && "bg-primary/10 text-primary",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
