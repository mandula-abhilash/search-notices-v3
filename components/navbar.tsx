"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Notifications", href: "/notifications" },
  { name: "Results", href: "/results" },
  { name: "Universities", href: "/universities" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center px-4 lg:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="hidden font-bold text-primary sm:inline-block">
            EduNotify
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild>
              <Link href="/admin">Admin Login</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}