"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title?: string;
  subTitle?: string;
  showReset?: React.ReactNode;
  resetLabel?: string;
  onClick?: () => void;
};

export default function EmptyState({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you are looking for.",
  showReset,
  resetLabel = "Reset Filters",
  onClick,
}: EmptyStateProps) {
  const router = useRouter();
  const onReset = React.useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      router.push("/");
    }
  }, [onClick, router]);
  return (
    <section className="bg-[#FAFAFA]">
      <div className="layout flex h-screen flex-col items-center justify-center gap-2">
        <h2>{title}</h2>
        <p>{subTitle}</p>
        {showReset && (
          <Button className="mt-4 w-48" onClick={onReset}>
            {resetLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
