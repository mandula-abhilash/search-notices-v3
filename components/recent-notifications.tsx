import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "UPSC Civil Services 2024",
    date: "2024-02-14",
    type: "Government",
    state: "National",
  },
  {
    id: 2,
    title: "JEE Main April Session",
    date: "2024-02-12",
    type: "Engineering",
    state: "National",
  },
  {
    id: 3,
    title: "NEET PG 2024",
    date: "2024-02-10",
    type: "Medical",
    state: "National",
  },
];

export function RecentNotifications() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Notifications</h2>
        <Link
          href="/notifications"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            href={`/notifications/${notification.id}`}
            className="block"
          >
            <div className="group rounded-lg border p-4 transition-all hover:bg-muted">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium group-hover:text-primary">
                  {notification.title}
                </h3>
                <Badge variant="outline">{notification.type}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4" />
                {notification.date}
                <Badge variant="secondary" className="ml-2">
                  {notification.state}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}