"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Companion } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type companionsPROPS = {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
};

export default function Companions({ data }: companionsPROPS) {
  if (data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center space-y-3 pt-10">
        <div className="relative h-60 w-60">
          <Image
            className="grayscale"
            src="/images/empty.png"
            fill
            alt="Empty"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          No companions found. <br />
          Try to search for another name or category.
        </p>
      </div>
    );
  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((companion) => (
        <Card
          key={companion.id}
          className="cursor-pointer rounded-xl border-0 bg-primary/10 transition hover:opacity-75"
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative h-32 w-32">
                <Image
                  className="rounded-xl object-cover"
                  src={companion.src}
                  fill
                  alt="Companion"
                />
              </div>
              <h4 className="font-bold">{companion.name}</h4>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>

            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{companion.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="mr-1 h-3 w-3" />
                {companion._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
