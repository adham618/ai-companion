"use client";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";
import { Companion } from "@prisma/client";

import * as React from "react";

type ChatMessagesProps = {
  companion: Companion;
  messages: ChatMessageProps[];
  isLoading: boolean;
};

export default function ChatMessages({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [fakeLoading, setFakeLoading] = React.useState(
    messages.length === 0 ? true : false,
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);
  return (
    <div className="overflow--y-auto flex-1 pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        role="system"
        content={`Hello, I'm ${companion.name}, ${companion.description}`}
        src={companion.src}
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          src={message.src}
          isLoading={message.isLoading}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
}
