import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";

export default function SearchPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <SearchBar />
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="mt-8">
      <div className="mb-4 h-8 w-48 animate-pulse rounded-md bg-muted"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted"></div>
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}