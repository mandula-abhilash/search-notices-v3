"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  notifications: any[];
  results: any[];
  universities: any[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    const results = localStorage.getItem("searchResults");
    if (results) {
      setSearchResults(JSON.parse(results));
    }
  }, [query]);

  if (!query) {
    return (
      <div className="mx-auto px-4 py-8">
        <SearchBar />
        <div className="mt-8 text-center text-muted-foreground">
          Enter a search term to find notifications, results, or universities
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <SearchBar />
      
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          Search Results for "{query}"
        </h2>

        {searchResults && (
          <div className="space-y-8">
            {/* Notifications */}
            {searchResults.notifications.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Notifications</h3>
                <div className="space-y-4">
                  {searchResults.notifications.map((item) => (
                    <Link key={item.id} href={`/notifications/${item.id}`}>
                      <Card className="p-4 hover:bg-muted">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge>{item.type}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {searchResults.results.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Results</h3>
                <div className="space-y-4">
                  {searchResults.results.map((item) => (
                    <Link key={item.id} href={`/results/${item.id}`}>
                      <Card className="p-4 hover:bg-muted">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.university} • {item.date}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Universities */}
            {searchResults.universities.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Universities</h3>
                <div className="space-y-4">
                  {searchResults.universities.map((item) => (
                    <Link key={item.id} href={`/universities/${item.id}`}>
                      <Card className="p-4 hover:bg-muted">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.location}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {Object.values(searchResults).every(arr => arr.length === 0) && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No results found for "{query}". Try different keywords or filters.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}