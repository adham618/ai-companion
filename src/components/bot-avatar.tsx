"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type BotAvatarPROPS = {
  src: string;
  name: string;
};

export default function BotAvatar({ src, name }: BotAvatarPROPS) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
