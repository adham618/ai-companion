"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@mantine/hooks";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = React.useState(name || "");
  const [debounced] = useDebouncedValue(value, 500);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  React.useEffect(() => {
    const query = {
      name: debounced,
      categoryId,
    };
    const url = qs.stringifyUrl(
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
  }, [categoryId, debounced, router]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        value={value}
        placeholder="Search..."
        className="bg-primary/10 pl-10"
      />
    </div>
  );
}
