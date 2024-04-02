"use client";

import ChatHeader from "@/components/chat-header";
import { Companion, Message } from "@prisma/client";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export default function ChatClient({ companion }: ChatClientProps) {
  return (
    <div className="flex h-full flex-col space-y-2 p-2">
      <ChatHeader companion={companion} />
    </div>
  );
}
