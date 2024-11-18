"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResultForm } from "./result-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, Trash, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Mock data - Will be replaced with API calls
const results = [
  {
    id: 1,
    title: "B.Tech 6th Semester Results",
    university: "Delhi University",
    examType: "Semester Results",
    date: "2024-02-14",
    year: 2024,
    resultLink: "https://results.du.ac.in",
    status: "declared",
  },
  {
    id: 2,
    title: "MBA Entrance Examination",
    university: "Mumbai University",
    examType: "Entrance Exam",
    date: "2024-02-12",
    year: 2024,
    resultLink: "https://results.mu.ac.in",
    status: "processing",
  },
];

const statusColors = {
  declared: "success",
  processing: "warning",
  awaited: "secondary",
} as const;

export function ResultTable() {
  const [editingResult, setEditingResult] = useState<any>(null);
  const [deletingResult, setDeletingResult] = useState<any>(null);

  const handleDelete = async () => {
    try {
      // API call will be implemented here
      console.log("Deleting result:", deletingResult.id);
      toast.success("Result deleted successfully");
      setDeletingResult(null);
    } catch (error) {
      toast.error("Failed to delete result");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.title}</TableCell>
                <TableCell>{result.university}</TableCell>
                <TableCell>{result.examType}</TableCell>
                <TableCell>{result.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={statusColors[result.status as keyof typeof statusColors]}
                  >
                    {result.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {result.status === "declared" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <Link href={result.resultLink} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingResult(result)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeletingResult(result)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!editingResult}
        onOpenChange={() => setEditingResult(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Result</DialogTitle>
          </DialogHeader>
          <ResultForm
            initialData={editingResult}
            onSuccess={() => setEditingResult(null)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingResult}
        onOpenChange={() => setDeletingResult(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              result.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}