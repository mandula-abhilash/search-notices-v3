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
import {
  LOCATIONS,
  UNIVERSITY_TYPES,
  ACCREDITATIONS,
  RANKINGS,
  UniversityFiltersType,
} from "@/types/universities";
import { X } from "lucide-react";

interface UniversityFiltersProps {
  filters: UniversityFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<UniversityFiltersType>>;
}

export function UniversityFilters({
  filters,
  setFilters,
}: UniversityFiltersProps) {
  const clearFilters = () => {
    setFilters({
      location: [],
      type: [],
      ranking: undefined,
      accreditation: [],
    });
  };

  const hasActiveFilters =
    filters.location.length > 0 ||
    filters.type.length > 0 ||
    filters.ranking ||
    filters.accreditation.length > 0;

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
          <h3 className="mb-4 text-sm font-medium">Location</h3>
          <div className="space-y-3">
            {LOCATIONS.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={filters.location.includes(location)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      location: checked
                        ? [...prev.location, location]
                        : prev.location.filter((l) => l !== location),
                    }));
                  }}
                />
                <label
                  htmlFor={location}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">University Type</h3>
          <div className="space-y-3">
            {UNIVERSITY_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.type.includes(type)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      type: checked
                        ? [...prev.type, type]
                        : prev.type.filter((t) => t !== type),
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
          <h3 className="mb-4 text-sm font-medium">Ranking</h3>
          <Select
            value={filters.ranking || "all"}
            onValueChange={(value: UniversityFiltersType["ranking"]) =>
              setFilters((prev) => ({
                ...prev,
                ranking: value === "all" ? undefined : value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ranking range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All rankings</SelectItem>
              {RANKINGS.map((ranking) => (
                <SelectItem key={ranking.value} value={ranking.value}>
                  {ranking.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Accreditation</h3>
          <div className="space-y-3">
            {ACCREDITATIONS.map((accreditation) => (
              <div key={accreditation} className="flex items-center space-x-2">
                <Checkbox
                  id={accreditation}
                  checked={filters.accreditation.includes(accreditation)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      accreditation: checked
                        ? [...prev.accreditation, accreditation]
                        : prev.accreditation.filter((a) => a !== accreditation),
                    }));
                  }}
                />
                <label
                  htmlFor={accreditation}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {accreditation}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}