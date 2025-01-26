"use client";
import { getProductMarks } from "@/app/data/products-data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// Removed import for Label from "recharts"

interface Props {
  marks: Awaited<ReturnType<typeof getProductMarks>>;
  queryKey: string;
  handleSearch: (key: string, value: string[]) => void;
  initialState: string[];
}

const MarksFilter = ({
  marks,
  handleSearch,
  initialState,
  queryKey,
}: Props) => {
  console.log(marks);
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
      <h3 className="font-semibold mb-4">Marques</h3>
      <div className="space-y-3">
        {marks.map((mark) => (
          <div key={mark.mark} className="flex items-center space-x-2">
            <Checkbox
              defaultChecked={initialState.includes(mark.mark)}
              onClick={() => toggleValue(mark.mark)}
              key={mark.mark}
              id={mark.mark}
            />
            <Label htmlFor={mark.mark}>
              {mark.mark}{" "}
              <span className="text-sm">{mark.count}</span>{" "}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarksFilter;
