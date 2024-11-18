import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Trophy,
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UniversityFiltersType, UniversityType } from "@/types/universities";

// Mock data - In production, this would come from an API
const universities: UniversityType[] = [
  {
    id: 1,
    name: "Indian Institute of Technology, Delhi",
    location: "Delhi",
    type: "Institute of National Importance",
    ranking: 1,
    accreditation: ["NAAC A++", "NBA"],
    established: 1961,
    courses: [
      "B.Tech",
      "M.Tech",
      "PhD",
      "MBA",
      "MSc",
    ],
    website: "https://iitd.ac.in",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000",
    description:
      "IIT Delhi is one of India's premier institutions known for its cutting-edge research and innovation in engineering and technology.",
    highlights: {
      students: 8500,
      faculty: 600,
      researchPapers: 2000,
      placement: 98,
    },
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "Delhi",
    type: "Institute of National Importance",
    ranking: 1,
    accreditation: ["NAAC A++"],
    established: 1956,
    courses: [
      "MBBS",
      "MD",
      "MS",
      "DM",
      "MCh",
    ],
    website: "https://aiims.edu",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1000",
    description:
      "AIIMS is India's leading public healthcare institute offering world-class medical education and research facilities.",
    highlights: {
      students: 7000,
      faculty: 800,
      researchPapers: 1500,
      placement: 100,
    },
  },
  {
    id: 3,
    name: "Delhi University",
    location: "Delhi",
    type: "Central",
    ranking: 3,
    accreditation: ["NAAC A+", "UGC Autonomous"],
    established: 1922,
    courses: [
      "BA",
      "BSc",
      "BCom",
      "MA",
      "PhD",
    ],
    website: "https://du.ac.in",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000",
    description:
      "Delhi University is one of India's largest universities offering diverse courses in arts, commerce, and sciences.",
    highlights: {
      students: 65000,
      faculty: 1500,
      researchPapers: 1200,
      placement: 85,
    },
  },
];

interface UniversityListProps {
  filters: UniversityFiltersType;
}

export function UniversityList({ filters }: UniversityListProps) {
  const getRankingRange = (ranking: string | undefined) => {
    switch (ranking) {
      case "top10":
        return { min: 1, max: 10 };
      case "top25":
        return { min: 1, max: 25 };
      case "top50":
        return { min: 1, max: 50 };
      case "top100":
        return { min: 1, max: 100 };
      default:
        return null;
    }
  };

  const filteredUniversities = universities.filter((university) => {
    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.includes(university.location);
    const matchesType =
      filters.type.length === 0 || filters.type.includes(university.type);
    const matchesRanking = !filters.ranking
      ? true
      : (() => {
          const range = getRankingRange(filters.ranking);
          return range
            ? university.ranking >= range.min && university.ranking <= range.max
            : true;
        })();
    const matchesAccreditation =
      filters.accreditation.length === 0 ||
      filters.accreditation.some((a) => university.accreditation.includes(a));

    return matchesLocation && matchesType && matchesRanking && matchesAccreditation;
  });

  if (filteredUniversities.length === 0) {
    return (
      <Card className="flex h-[400px] items-center justify-center p-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold">No universities found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {filteredUniversities.map((university) => (
        <Card key={university.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={university.image}
              alt={university.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">{university.name}</h3>
                <Badge variant="outline">Rank #{university.ranking}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {university.description}
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                <Users className="mb-1 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  {university.highlights.students.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Students</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                <GraduationCap className="mb-1 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  {university.highlights.faculty.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Faculty</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                <BookOpen className="mb-1 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  {university.highlights.researchPapers.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Research Papers</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                <Briefcase className="mb-1 h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  {university.highlights.placement}%
                </span>
                <span className="text-xs text-muted-foreground">Placement</span>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {university.accreditation.map((accr) => (
                <Badge key={accr} variant="secondary">
                  {accr}
                </Badge>
              ))}
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {university.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Trophy className="mr-1 h-4 w-4" />
                Est. {university.established}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {university.courses.map((course) => (
                <Badge key={course} variant="outline">
                  {course}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <Button asChild className="w-full">
                <Link href={university.website} target="_blank">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}