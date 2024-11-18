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
import { UniversityForm } from "./university-form";
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
const universities = [
  {
    id: 1,
    name: "Indian Institute of Technology, Delhi",
    location: "Delhi",
    type: "Institute of National Importance",
    ranking: 1,
    accreditation: ["NAAC A++", "NBA"],
    website: "https://iitd.ac.in",
  },
  {
    id: 2,
    name: "Delhi University",
    location: "Delhi",
    type: "Central",
    ranking: 3,
    accreditation: ["NAAC A+"],
    website: "https://du.ac.in",
  },
];

export function UniversityTable() {
  const [editingUniversity, setEditingUniversity] = useState<any>(null);
  const [deletingUniversity, setDeletingUniversity] = useState<any>(null);

  const handleDelete = async () => {
    try {
      // API call will be implemented here
      console.log("Deleting university:", deletingUniversity.id);
      toast.success("University deleted successfully");
      setDeletingUniversity(null);
    } catch (error) {
      toast.error("Failed to delete university");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead>Accreditation</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {universities.map((university) => (
              <TableRow key={university.id}>
                <TableCell className="font-medium">
                  {university.name}
                </TableCell>
                <TableCell>{university.location}</TableCell>
                <TableCell>{university.type}</TableCell>
                <TableCell>#{university.ranking}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {university.accreditation.map((accr) => (
                      <Badge key={accr} variant="secondary">
                        {accr}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <Link href={university.website} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingUniversity(university)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeletingUniversity(university)}
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
        open={!!editingUniversity}
        onOpenChange={() => setEditingUniversity(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit University</DialogTitle>
          </DialogHeader>
          <UniversityForm
            initialData={editingUniversity}
            onSuccess={() => setEditingUniversity(null)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingUniversity}
        onOpenChange={() => setDeletingUniversity(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              university and all associated data.
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