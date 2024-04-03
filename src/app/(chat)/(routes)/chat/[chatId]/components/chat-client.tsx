"use client";

import * as React from "react";

import ChatForm from "@/components/chat-form";
import ChatHeader from "@/components/chat-header";
import { ChatMessageProps } from "@/components/chat-message";
import ChatMessages from "@/components/chat-messages";
import { Companion, Message } from "@prisma/client";
import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export default function ChatClient({ companion }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessageProps[]>(
    companion.messages,
  );

  const {
    completion,
    input,
    handleInputChange,
    setInput,
    isLoading,
    handleSubmit,
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish: (completion) => {
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion,
      };

      setMessages([...messages, systemMessage]);
      setInput("");

      router.refresh();
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);

    handleSubmit(event);
  };

  return (
    <div className="flex h-full flex-col space-y-2 p-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
