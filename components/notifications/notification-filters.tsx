"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { STATES, EXAM_TYPES, NotificationFiltersType } from "@/types/notifications";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

interface NotificationFiltersProps {
  filters: NotificationFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<NotificationFiltersType>>;
}

export function NotificationFilters({
  filters,
  setFilters,
}: NotificationFiltersProps) {
  const clearFilters = () => {
    setFilters({
      state: [],
      examType: [],
      date: undefined,
    });
  };

  const hasActiveFilters =
    filters.state.length > 0 || filters.examType.length > 0 || filters.date;

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
            {STATES.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={state}
                  checked={filters.state.includes(state)}
                  onCheckedChange={(checked) => {
                    setFilters((prev) => ({
                      ...prev,
                      state: checked
                        ? [...prev.state, state]
                        : prev.state.filter((s) => s !== state),
                    }));
                  }}
                />
                <label
                  htmlFor={state}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {state}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Exam Type</h3>
          <div className="space-y-3">
            {EXAM_TYPES.map((type) => (
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
          <h3 className="mb-4 text-sm font-medium">Date</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date ? (
                  format(filters.date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.date}
                onSelect={(date) =>
                  setFilters((prev) => ({ ...prev, date }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}