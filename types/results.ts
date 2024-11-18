export type ResultType = {
  id: number;
  title: string;
  university: string;
  examType: string;
  date: string;
  year: number;
  resultLink: string;
  status: "declared" | "awaited" | "processing";
  lastUpdated: string;
};

export type ResultFiltersType = {
  university: string[];
  examType: string[];
  year?: number;
};

export const UNIVERSITIES = [
  "Delhi University",
  "Mumbai University",
  "Bangalore University",
  "Anna University",
  "Osmania University",
  "Calcutta University",
] as const;

export const RESULT_TYPES = [
  "Semester Results",
  "Entrance Exam",
  "Competitive Exam",
  "Professional Course",
  "Certification",
] as const;

export const YEARS = [2024, 2023, 2022, 2021, 2020] as const;