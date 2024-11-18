"use client";

import { UniversityFilters } from "@/components/universities/university-filters";
import { UniversityList } from "@/components/universities/university-list";
import { SearchBar } from "@/components/search-bar";
import { FilterDrawer } from "@/components/filters/filter-drawer";
import { useState } from "react";
import { UniversityFiltersType } from "@/types/universities";

export default function UniversitiesPage() {
  const [filters, setFilters] = useState<UniversityFiltersType>({
    location: [],
    type: [],
    ranking: undefined,
    accreditation: [],
  });

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Universities</h1>
        <p className="text-muted-foreground">
          Explore top universities and educational institutions across India.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-4 lg:hidden">
        <FilterDrawer title="Filter Universities">
          <UniversityFilters filters={filters} setFilters={setFilters} />
        </FilterDrawer>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <UniversityFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <UniversityList filters={filters} />
        </div>
      </div>
    </div>
  );
}