import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy } from "lucide-react";
import Link from "next/link";

const universities = [
  {
    id: 1,
    name: "Indian Institute of Technology, Delhi",
    location: "New Delhi",
    ranking: 1,
    type: "Engineering",
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    ranking: 1,
    type: "Medical",
  },
  {
    id: 3,
    name: "Delhi University",
    location: "New Delhi",
    ranking: 1,
    type: "Arts & Science",
  },
];

export function TopUniversities() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Top Universities</h2>
        <Link
          href="/universities"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {universities.map((university) => (
          <Link
            key={university.id}
            href={`/universities/${university.id}`}
            className="block"
          >
            <div className="group rounded-lg border p-4 transition-all hover:bg-muted">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium group-hover:text-primary">
                  {university.name}
                </h3>
                <Badge variant="outline">{university.type}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {university.location}
                </div>
                <div className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  Rank #{university.ranking}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}