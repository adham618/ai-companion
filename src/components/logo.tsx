"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type indexProps = {
  className?: string;
  src?: string;
  width?: number;
  height?: number;
  href?: string;
};

export default function Logo({
  className,
  src = "/images/logo.svg",
  width = 98.59,
  height = 46.95,
  href = "/",
}: indexProps) {
  return (
    <Link href={href} aria-label="site-logo">
      <Image
        className={cn(
          "h-[35.946px] w-[75.489px] max-w-full sm:h-[46.95px] sm:w-[98.59px]",
          className,
        )}
        src={src}
        width={width}
        height={height}
        priority
        alt="site-logo"
      />
    </Link>
  );
}
