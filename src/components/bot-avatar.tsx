"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

type BotAvatarPROPS = {
  src: string;
};

export default function BotAvatar({ src }: BotAvatarPROPS) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} alt={"avatar"} />
    </Avatar>
  );
}
