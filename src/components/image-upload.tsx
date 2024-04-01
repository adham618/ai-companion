"use client";

import { cn } from "@/lib/utils";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import * as React from "react";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function ImageUpload({
  value,
  onChange,
  disabled,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-4",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
      )}
    >
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="u5dsgrax"
        onSuccess={(result: any) => {
          onChange(result.info.secure_url);
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border-4 border-dashed border-primary/10 p-4 transition hover:opacity-75">
          <div className="relative h-40 w-40">
            <Image
              className="rounded-lg object-cover"
              fill
              src={value || "/images/placeholder.svg"}
              alt="upload"
              priority
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
}
