import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { NotificationFiltersType, NotificationType } from "@/types/notifications";

// Mock data - In production, this would come from an API
const notifications: NotificationType[] = [
  {
    id: 1,
    title: "UPSC Civil Services 2024",
    description: "Applications are invited for Civil Services Examination 2024",
    date: "2024-02-14",
    type: "Government",
    state: "National",
    institution: "Union Public Service Commission",
    lastDate: "2024-03-15",
    applicationLink: "https://upsc.gov.in",
  },
  {
    id: 2,
    title: "JEE Main April Session 2024",
    description: "Joint Entrance Examination for Engineering Admissions",
    date: "2024-02-12",
    type: "Engineering",
    state: "National",
    institution: "National Testing Agency",
    lastDate: "2024-03-10",
    applicationLink: "https://jeemain.nta.nic.in",
  },
  {
    id: 3,
    title: "NEET PG 2024",
    description: "National Eligibility cum Entrance Test for Post Graduation",
    date: "2024-02-10",
    type: "Medical",
    state: "National",
    institution: "National Board of Examinations",
    lastDate: "2024-03-20",
    applicationLink: "https://nbe.edu.in",
  },
];

interface NotificationListProps {
  filters: NotificationFiltersType;
}

export function NotificationList({ filters }: NotificationListProps) {
  // Filter notifications based on selected filters
  const filteredNotifications = notifications.filter((notification) => {
    const matchesState =
      filters.state.length === 0 || filters.state.includes(notification.state);
    const matchesType =
      filters.examType.length === 0 ||
      filters.examType.includes(notification.type);
    const matchesDate =
      !filters.date ||
      new Date(notification.date).toDateString() ===
        filters.date.toDateString();

    return matchesState && matchesType && matchesDate;
  });

  if (filteredNotifications.length === 0) {
    return (
      <Card className="flex h-[400px] items-center justify-center p-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold">No notifications found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <Card key={notification.id} className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-xl font-semibold">
                {notification.title}
              </h3>
              <p className="mb-2 text-sm text-muted-foreground">
                {notification.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{notification.type}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {notification.state}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  Last Date: {notification.lastDate}
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href={notification.applicationLink} target="_blank">
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            By {notification.institution}
          </div>
        </Card>
      ))}
    </div>
  );
}