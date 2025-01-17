"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearchRouting = () => {
    router.push(`/search?q=${ref.current?.value}`);
  };
  return (
    <div className="hidden w-full md:flex md:flex-1 md:items-center md:gap-2">
      <div className="flex-1 flex items-center gap-2 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            ref={ref}
            type="search"
            placeholder="Rechercher des produits"
            className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-tahat-500 focus:ring-tahat-500"
          />
        </div>
        <Button onClick={handleSearchRouting} className="hidden sm:flex">
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
