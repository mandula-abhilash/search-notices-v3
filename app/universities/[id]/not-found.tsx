import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[600px] items-center justify-center px-4">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">University Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The university you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/universities">Back to Universities</Link>
        </Button>
      </div>
    </div>
  );
}