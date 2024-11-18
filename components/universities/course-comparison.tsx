"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Course {
  name: string;
  duration: string;
  seats: number;
  eligibility: string;
}

interface CourseComparisonProps {
  courses: Course[];
}

export function CourseComparison({ courses }: CourseComparisonProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const handleAddCourse = (courseName: string) => {
    const course = courses.find((c) => c.name === courseName);
    if (course && selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (courseName: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.name !== courseName));
  };

  const availableCourses = courses.filter(
    (course) => !selectedCourses.find((c) => c.name === course.name)
  );

  if (selectedCourses.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Select courses to compare their details
        </p>
        <Select onValueChange={handleAddCourse}>
          <SelectTrigger className="w-[200px] mx-auto">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.name} value={course.name}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Course Comparison</h3>
        {selectedCourses.length < 3 && (
          <Select onValueChange={handleAddCourse}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Add course to compare" />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course.name} value={course.name}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Features</TableHead>
              {selectedCourses.map((course) => (
                <TableHead key={course.name}>
                  <div className="flex items-center justify-between">
                    <span>{course.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveCourse(course.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Duration</TableCell>
              {selectedCourses.map((course) => (
                <TableCell key={course.name}>{course.duration}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Available Seats</TableCell>
              {selectedCourses.map((course) => (
                <TableCell key={course.name}>{course.seats}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Eligibility</TableCell>
              {selectedCourses.map((course) => (
                <TableCell key={course.name}>{course.eligibility}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}