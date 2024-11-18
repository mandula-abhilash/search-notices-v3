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
import { NotificationForm } from "./notification-form";
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
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock data - Will be replaced with API calls
const notifications = [
  {
    id: 1,
    title: "UPSC Civil Services 2024",
    type: "Government",
    state: "National",
    lastDate: "2024-03-15",
    status: "active",
  },
  {
    id: 2,
    title: "JEE Main April Session",
    type: "Engineering",
    state: "National",
    lastDate: "2024-03-10",
    status: "draft",
  },
];

export function NotificationTable() {
  const [editingNotification, setEditingNotification] = useState<any>(null);
  const [deletingNotification, setDeletingNotification] = useState<any>(null);

  const handleDelete = async () => {
    try {
      // API call will be implemented here
      console.log("Deleting notification:", deletingNotification.id);
      toast.success("Notification deleted successfully");
      setDeletingNotification(null);
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Last Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">
                  {notification.title}
                </TableCell>
                <TableCell>{notification.type}</TableCell>
                <TableCell>{notification.state}</TableCell>
                <TableCell>{notification.lastDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={notification.status === "active" ? "default" : "secondary"}
                  >
                    {notification.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setEditingNotification(notification)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeletingNotification(notification)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!editingNotification}
        onOpenChange={() => setEditingNotification(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
          </DialogHeader>
          <NotificationForm
            initialData={editingNotification}
            onSuccess={() => setEditingNotification(null)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingNotification}
        onOpenChange={() => setDeletingNotification(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              notification.
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