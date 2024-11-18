import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, GraduationCap, School } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Latest Notifications",
    description: "Stay updated with the most recent exam announcements",
    icon: Bell,
    href: "/notifications",
    badge: "New",
  },
  {
    title: "Exam Results",
    description: "Access your results from various universities",
    icon: GraduationCap,
    href: "/results",
  },
  {
    title: "Top Universities",
    description: "Explore leading educational institutions",
    icon: School,
    href: "/universities",
  },
];

export function FeaturedSection() {
  return (
    <section className="mb-12 grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <Link key={feature.title} href={feature.href}>
          <Card className="card-hover-gradient group relative overflow-hidden p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <feature.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              {feature.badge && (
                <Badge variant="secondary" className="bg-accent text-white">
                  {feature.badge}
                </Badge>
              )}
            </div>
            <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        </Link>
      ))}
    </section>
  );
}