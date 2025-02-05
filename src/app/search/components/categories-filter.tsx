"use client";
import { getAllCategories } from "@/app/data/categories-data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// Removed import for Label from "recharts"

interface Props {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  queryKey: string;
  handleSearch: (key: string, value: string[]) => void;
  initialState: string[];
}

const CategoriesFilter = ({
  categories,
  handleSearch,
  initialState,
  queryKey,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialState);
  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  useEffect(() => {
    handleSearch(queryKey, selectedValues);
  }, [handleSearch, queryKey, selectedValues]);
  return (
    <div>
      <h3 className="font-semibold mb-4">Catégories</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              defaultChecked={initialState.includes(category.slug)}
              onClick={() => toggleValue(category.slug)}
              key={category.id}
              id={category.id}
            />
            <Label htmlFor={category.id}>
              {category.name}{" "}
              <span className="text-sm">{category.products_count}</span>{" "}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
