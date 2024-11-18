export type UniversityType = {
  id: number;
  name: string;
  location: string;
  type: string;
  ranking: number;
  accreditation: string[];
  established: number;
  courses: string[];
  website: string;
  image: string;
  description: string;
  highlights: {
    students: number;
    faculty: number;
    researchPapers: number;
    placement: number;
  };
};

export type UniversityFiltersType = {
  location: string[];
  type: string[];
  ranking?: "top10" | "top25" | "top50" | "top100";
  accreditation: string[];
};

export const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
] as const;

export const UNIVERSITY_TYPES = [
  "Central",
  "State",
  "Private",
  "Deemed",
  "Institute of National Importance",
] as const;

export const ACCREDITATIONS = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NBA",
  "UGC Autonomous",
] as const;

export const RANKINGS = [
  { value: "top10", label: "Top 10" },
  { value: "top25", label: "Top 25" },
  { value: "top50", label: "Top 50" },
  { value: "top100", label: "Top 100" },
] as const;