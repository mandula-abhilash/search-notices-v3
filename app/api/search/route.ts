import { NextResponse } from "next/server";

// Mock data - In production, this would come from a database
const searchData = {
  notifications: [
    {
      id: 1,
      title: "UPSC Civil Services 2024",
      type: "Government",
      date: "2024-02-14",
    },
    // Add more notifications...
  ],
  results: [
    {
      id: 1,
      title: "B.Tech 6th Semester Results",
      university: "Delhi University",
      date: "2024-02-14",
    },
    // Add more results...
  ],
  universities: [
    {
      id: 1,
      name: "Indian Institute of Technology, Delhi",
      location: "Delhi",
      type: "Institute of National Importance",
    },
    // Add more universities...
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = {
    notifications: searchData.notifications.filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.type.toLowerCase().includes(query)
    ),
    results: searchData.results.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.university.toLowerCase().includes(query)
    ),
    universities: searchData.universities.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.location.toLowerCase().includes(query) || 
      u.type.toLowerCase().includes(query)
    ),
  };

  return NextResponse.json(results);
}