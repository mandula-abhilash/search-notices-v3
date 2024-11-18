"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (value: string) => {
    router.push(`/admin/${value}`);
  };

  const currentTab = pathname.split("/")[2] || "dashboard";

  return (
    <div className="mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <Card className="p-1">
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="">Dashboard</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="universities">Universities</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
      </div>
      {children}
    </div>
  );
}