"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MapPin,
  Trophy,
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  ExternalLink,
  Building,
  Award,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UniversityActions } from "@/components/universities/university-actions";
import { CourseComparison } from "@/components/universities/course-comparison";
import { Toaster } from "sonner";
import { UniversityType } from "@/types/universities";

// Mock data for demonstration
const mockUniversity: UniversityType = {
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
};

export default function UniversityPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, fetch university data based on params.id
  const university = mockUniversity;

  if (!university) {
    notFound();
  }

  return (
    <div className="mx-auto px-4 py-8">
      <Toaster />
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/universities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to Universities
          </Link>
          <UniversityActions
            universityId={university.id}
            universityName={university.name}
          />
        </div>
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={university.image}
            alt={university.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="mb-2 text-4xl font-bold text-white">
              {university.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="secondary" className="text-lg">
                Rank #{university.ranking}
              </Badge>
              {university.accreditation.map((accr) => (
                <Badge key={accr} variant="outline" className="text-white">
                  {accr}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="compare">Compare Courses</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-3">
            {university.courses.map((course) => (
              <Card key={course}>
                <CardHeader>
                  <CardTitle>{course}</CardTitle>
                  <CardDescription>4 Years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>60 Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>12th PCM with 75%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare">
          <Card>
            <CardContent className="pt-6">
              <CourseComparison courses={[
                { name: "B.Tech", duration: "4 Years", seats: 60, eligibility: "12th PCM with 75%" },
                { name: "M.Tech", duration: "2 Years", seats: 30, eligibility: "B.Tech with 70%" },
                { name: "PhD", duration: "3-5 Years", seats: 20, eligibility: "M.Tech/M.Sc with 75%" }
              ]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art library with over 100,000 books and digital resources.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Laboratories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern research labs equipped with latest technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sports Complex</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Multi-purpose sports facilities including indoor and outdoor courts.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Over 2000 research papers published in international journals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  150+ patents filed in the last 5 years.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 11 2659 1000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@iitd.ac.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Monday to Friday, 9:00 AM to 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}