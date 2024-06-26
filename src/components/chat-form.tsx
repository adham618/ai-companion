"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";

type ChatFormProps = {
  isLoading: boolean;
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
};

export default function ChatForm({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant={"ghost"}>
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
}
