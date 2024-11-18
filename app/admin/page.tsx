import { Card } from "@/components/ui/card";
import {
  Bell,
  GraduationCap,
  School,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: "12.5k",
    change: "+12%",
    icon: Users,
  },
  {
    name: "Active Notifications",
    value: "48",
    change: "+8%",
    icon: Bell,
  },
  {
    name: "Results Published",
    value: "156",
    change: "+23%",
    icon: FileText,
  },
  {
    name: "Universities Listed",
    value: "89",
    change: "+15%",
    icon: School,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-primary" />
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
            <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.name}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          {/* Activity list will be populated from backend */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New notification added</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Quick Stats</h2>
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-sm font-medium">Pending Results</span>
              <span className="text-sm text-muted-foreground">12</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-sm font-medium">Active Applications</span>
              <span className="text-sm text-muted-foreground">48</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-sm font-medium">User Queries</span>
              <span className="text-sm text-muted-foreground">24</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}