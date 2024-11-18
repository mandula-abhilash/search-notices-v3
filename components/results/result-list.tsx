import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, GraduationCap, Clock } from "lucide-react";
import Link from "next/link";
import { ResultFiltersType, ResultType } from "@/types/results";

// Mock data - In production, this would come from an API
const results: ResultType[] = [
  {
    id: 1,
    title: "B.Tech 6th Semester Results",
    university: "Delhi University",
    examType: "Semester Results",
    date: "2024-02-14",
    year: 2024,
    resultLink: "https://results.du.ac.in",
    status: "declared",
    lastUpdated: "2024-02-14 10:00 AM",
  },
  {
    id: 2,
    title: "MBA Entrance Examination",
    university: "Mumbai University",
    examType: "Entrance Exam",
    date: "2024-02-12",
    year: 2024,
    resultLink: "https://results.mu.ac.in",
    status: "processing",
    lastUpdated: "2024-02-12 02:30 PM",
  },
  {
    id: 3,
    title: "B.Sc Final Year Results",
    university: "Bangalore University",
    examType: "Semester Results",
    date: "2024-02-10",
    year: 2024,
    resultLink: "https://results.bu.ac.in",
    status: "awaited",
    lastUpdated: "2024-02-10 09:15 AM",
  },
];

const statusColors = {
  declared: "success",
  processing: "warning",
  awaited: "secondary",
} as const;

interface ResultListProps {
  filters: ResultFiltersType;
}

export function ResultList({ filters }: ResultListProps) {
  const filteredResults = results.filter((result) => {
    const matchesUniversity =
      filters.university.length === 0 ||
      filters.university.includes(result.university);
    const matchesType =
      filters.examType.length === 0 ||
      filters.examType.includes(result.examType);
    const matchesYear = !filters.year || result.year === filters.year;

    return matchesUniversity && matchesType && matchesYear;
  });

  if (filteredResults.length === 0) {
    return (
      <Card className="flex h-[400px] items-center justify-center p-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredResults.map((result) => (
        <Card key={result.id} className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-xl font-semibold">{result.title}</h3>
                <Badge variant={statusColors[result.status]}>
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  {result.university}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  {result.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Last Updated: {result.lastUpdated}
                </div>
              </div>
            </div>
            {result.status === "declared" && (
              <Button asChild>
                <Link href={result.resultLink} target="_blank">
                  View Result
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <Badge variant="outline" className="mt-2">
            {result.examType}
          </Badge>
        </Card>
      ))}
    </div>
  );
}