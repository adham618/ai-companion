"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

export default function Header({ isPro }: { isPro: boolean }) {
  const proModal = useProModal();
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-secondary">
      <div className="flex h-16 items-center justify-between p-4 py-2">
        <div className="flex items-center">
          <MobileSidebar isPro={isPro} />
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
          {!isPro && (
            <Button
              onClick={() => {
                proModal.open();
              }}
              variant={"premium"}
              size="sm"
            >
              Upgrade
              <Sparkles className="ml-2 h-3 w-3 fill-white text-white" />
            </Button>
          )}

          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
