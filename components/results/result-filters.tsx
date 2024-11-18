"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UNIVERSITIES, RESULT_TYPES, YEARS, ResultFiltersType } from "@/types/results";
import { X } from "lucide-react";

interface ResultFiltersProps {
  filters: ResultFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<ResultFiltersType>>;
}

export function ResultFilters({ filters, setFilters }: ResultFiltersProps) {
  const clearFilters = () => {
    setFilters({
      university: [],
      examType: [],
      year: undefined,
    });
  };

  const hasActiveFilters =
    filters.university.length > 0 || filters.examType.length > 0 || filters.year;

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 text-xs"
          >
            Clear all
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-sm font-medium">Universities</h3>
          <div className="space-y-3">
            {UNIVERSITIES.map((university) => (
              <div key={university} className="flex items-center space-x-2">
                <Checkbox
                  id={university}
                  checked={filters.university.includes(university)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      university: checked
                        ? [...prev.university, university]
                        : prev.university.filter((u) => u !== university),
                    }));
                  }}
                />
                <label
                  htmlFor={university}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {university}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Result Type</h3>
          <div className="space-y-3">
            {RESULT_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.examType.includes(type)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      examType: checked
                        ? [...prev.examType, type]
                        : prev.examType.filter((t) => t !== type),
                    }));
                  }}
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Year</h3>
          <Select
            value={filters.year?.toString() || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                year: value === "all" ? undefined : parseInt(value),
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All years</SelectItem>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}