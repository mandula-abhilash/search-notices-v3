"use client";

import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

// Mock data - In production, this would come from your data source
const mockData = {
  notifications: [
    {
      id: 1,
      title: "UPSC Civil Services 2024",
      type: "Government",
      date: "2024-02-14",
    },
    {
      id: 2,
      title: "JEE Main April Session",
      type: "Engineering",
      date: "2024-02-12",
    },
  ],
  results: [
    {
      id: 1,
      title: "B.Tech 6th Semester Results",
      university: "Delhi University",
      date: "2024-02-14",
    },
    {
      id: 2,
      title: "MBA Entrance Examination",
      university: "Mumbai University",
      date: "2024-02-12",
    },
  ],
  universities: [
    {
      id: 1,
      name: "Indian Institute of Technology, Delhi",
      location: "Delhi",
      type: "Institute of National Importance",
    },
    {
      id: 2,
      name: "Delhi University",
      location: "Delhi",
      type: "Central",
    },
  ],
};

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        Enter a search term to find notifications, results, or universities
      </div>
    );
  }

  // Filter mock data based on search query
  const results = {
    notifications: mockData.notifications.filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.type.toLowerCase().includes(query)
    ),
    results: mockData.results.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.university.toLowerCase().includes(query)
    ),
    universities: mockData.universities.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.location.toLowerCase().includes(query) || 
      u.type.toLowerCase().includes(query)
    ),
  };

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  if (!hasResults) {
    return (
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          Search Results for "{query}"
        </h2>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No results found for "{query}". Try different keywords or filters.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">
        Search Results for "{query}"
      </h2>

      <div className="space-y-8">
        {results.notifications.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Notifications</h3>
            <div className="space-y-4">
              {results.notifications.map((item) => (
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

        {results.results.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Results</h3>
            <div className="space-y-4">
              {results.results.map((item) => (
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

        {results.universities.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Universities</h3>
            <div className="space-y-4">
              {results.universities.map((item) => (
                <Link key={item.id} href={`/universities/${item.id}`}>
                  <Card className="p-4 hover:bg-muted">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <p className="mt-2 flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {item.location}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}