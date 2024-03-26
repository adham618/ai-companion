"use client"; // Error components must be Client Components

import EmptyState from "@/components/empty-state";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="An error occurred"
      subTitle="Something went wrong. Please try again later."
      resetLabel="Try Again"
      showReset
      onClick={() => reset()}
    />
  );
}
