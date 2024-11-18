export type NotificationType = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  state: string;
  institution: string;
  lastDate: string;
  applicationLink: string;
};

export type NotificationFiltersType = {
  state: string[];
  examType: string[];
  date?: Date;
};

export const STATES = [
  "National",
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Uttar Pradesh",
] as const;

export const EXAM_TYPES = [
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Government",
  "Banking",
] as const;