"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const params = useSearchParams();
  const [query, setQuery] = useState("");

  const handleSearchRouting = () => {
    const searchQuery = inputRef.current?.value || "";
    if (linkRef.current) {
      linkRef.current.href = `/search?q=${searchQuery}`;
    }
    linkRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchRouting();
    }
  };
  useEffect(() => {
    const q = params.get("q");
    if (q) {
      setQuery(q);
    }
  }, [setQuery, params]);

  return (
    <div className="flex w-full items-center gap-2 md:flex-1">
      <div className="relative flex-1 flex items-center gap-2 max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="Rechercher des produits"
          className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-tahat-500 focus:ring-tahat-500"
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Link
        className="hidden sm:block"
        ref={linkRef}
        href={`/search?q=${query}`}
        passHref
      >
        <Button
          variant={"ghost"}
          onClick={handleSearchRouting}
          className="flex "
        >
          <Search className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default SearchBar;
