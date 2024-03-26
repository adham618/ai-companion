"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
};

export default function NotFound() {
  const router = useRouter();
  return (
    <main>
      <section>
        <div className="layout flex min-h-screen max-w-md flex-col items-center justify-center">
          <h1 className="mb-3 text-8xl font-semibold md:text-9xl">404</h1>
          <h4 className="text-base font-medium">Looks like you&apos;re lost</h4>

          <div className="mt-6 grid w-full grid-cols-2 items-center space-x-4">
            <Button
              variant="outline"
              className="py-6 text-sm sm:text-xl md:text-base"
              onClick={() => router.back()}
              aria-label="Go back"
            >
              <span className="text-clip">Go Back</span>
            </Button>

            <Button asChild className="py-6 text-sm sm:text-xl md:text-base">
              <Link href="/" aria-label="Home">
                Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
