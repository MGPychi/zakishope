"use client";

import { useCallback, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
import { getAllCategories } from "@/app/data/categories-data";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CategoriesFilter from "./categories-filter";
import { getProductMarks } from "@/app/data/products-data";
import MarksFilter from "./marks-filter";
interface Props {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  marks: Awaited<ReturnType<typeof getProductMarks>>;
}
export function SearchFilters({ categories, marks }: Props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // const [priceRange, setPriceRange] = useState([0, 1000]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const parseValues = (key: string): string[] => {
    const value = params.get(key);
    if (value) {
      return value.split("_or_");
    }
    return [];
  };
  const handleSearch = useCallback(
    (key: string, value: string[]) => {
      if (value && value.length) {
        params.set(key, value.join("_or_"));
      } else {
        params.delete(key);
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, router]
  );

  const filterContent = (
    <div className="space-y-6">
      <CategoriesFilter
        categories={categories}
        handleSearch={handleSearch}
        initialState={parseValues("category")}
        queryKey="category"
      />
      <MarksFilter
        marks={marks}
        handleSearch={handleSearch}
        initialState={parseValues("mark")}
        queryKey="mark"
      />

      {/* <div>
        <h3 className="font-semibold mb-4">Prix</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>€{priceRange[0]}</span>
          <span>€{priceRange[1]}</span>
        </div>
      </div> */}

      {/* <div>
        <h3 className="font-semibold mb-4">État</h3>
        <div className="space-y-3">
          {["Nouveau", "En promotion", "En stock"].map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox id={status} />
              <Label htmlFor={status}>{status}</Label>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block w-64 space-y-6">{filterContent}</div>

      {/* Mobile Filters */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden w-full">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
          </SheetHeader>
          <div className="mt-4">{filterContent}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
