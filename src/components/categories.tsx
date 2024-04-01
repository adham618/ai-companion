"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

type categoriesProps = {
  data: Category[];
};
export default function Categories({ data }: categoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );
    router.push(url);
  };
  return (
    <div className="flex w-full space-x-2 overflow-x-auto p-1">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          "flex shrink-0 items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
          !categoryId && "bg-primary/25",
        )}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => onClick(category.id)}
          className={cn(
            "flex shrink-0 items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
            categoryId === category.id && "bg-primary/25",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
