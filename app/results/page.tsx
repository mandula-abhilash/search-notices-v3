"use client";

import { ResultFilters } from "@/components/results/result-filters";
import { ResultList } from "@/components/results/result-list";
import { SearchBar } from "@/components/search-bar";
import { FilterDrawer } from "@/components/filters/filter-drawer";
import { useState } from "react";
import { ResultFiltersType } from "@/types/results";

export default function ResultsPage() {
  const [filters, setFilters] = useState<ResultFiltersType>({
    university: [],
    examType: [],
    year: undefined,
  });

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Exam Results</h1>
        <p className="text-muted-foreground">
          Access examination results from various universities and institutions.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-4 lg:hidden">
        <FilterDrawer title="Filter Results">
          <ResultFilters filters={filters} setFilters={setFilters} />
        </FilterDrawer>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ResultFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <ResultList filters={filters} />
        </div>
      </div>
    </div>
  );
}