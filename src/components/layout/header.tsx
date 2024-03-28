"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sparkle } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import * as React from "react";
const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});
export default function Header() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="sticky top-0 z-50  border-b border-primary/10 bg-secondary">
      <div className="layout flex items-center justify-between py-2">
        <div className="flex items-center">
          <HamburgerMenuIcon className="block md:hidden" />
          <Link
            href="/"
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            companion.ai
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <Button variant={"premium"} size="sm">
            Upgrade
            <Sparkle className="ml-2 h-3 w-3 fill-white text-white" />
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}