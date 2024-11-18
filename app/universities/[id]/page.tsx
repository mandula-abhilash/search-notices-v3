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

// Mock data remains the same as before...

export default function UniversityPage({
  params,
}: {
  params: { id: string };
}) {
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

      {/* Rest of the component remains the same until the Tabs section */}

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
              <Card key={course.name}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>Duration: {course.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Seats: {course.seats}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Eligibility: {course.eligibility}</span>
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
              <CourseComparison courses={university.courses} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rest of the TabsContent sections remain the same */}
      </Tabs>
    </div>
  );
}