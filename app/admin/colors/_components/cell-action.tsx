"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertDialogDemo } from "@/components/modals/AlertModal";
import { ColorColumn } from "@/app/admin/colors/_components/columns";
import { deleteColorAction } from "../../_actions/color-action";

type CellActionProps = {
  data: ColorColumn;
};

export const CellAction = ({ data }: CellActionProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteColorAction(id),
    onSuccess: (res) => {
      if (!res) {
        toast.error("Error deleting Color. Let's try again.");
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["color", data.id] });
      toast.success("Color Deleted! Create another one!", {
        action: {
          label: "Create",
          onClick: () => router.push(`/admin/colors/create`),
        },
      });
    },
  });

  const onCopy = (id: string, toastText: string) => {
    navigator.clipboard.writeText(data.id);
    toast.success(`${toastText} has been copied`);
  };
  return (
    <>
      <AlertDialogDemo
        isOpen={isAlertOpen}
        title="Are you absolutely sure?"
        desc="This action cannot be undone. This will permanently delete your
            color"
        onClose={() => {
          setIsAlertOpen(false);
        }}
        onConfirm={() => {
          mutate(data.id);
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/colors/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id, "Color ID")}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => onCopy(data.createdUserId, "Created UserID")}
          >
            <Copy className="mr-2 h-4 w-4" />
            Created By ID
          </DropdownMenuItem> */}
          {/* {data.updatedUserId && (
            <DropdownMenuItem
              onClick={() => onCopy(data.updatedUserId!, "Updated UserID")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Updated By ID
            </DropdownMenuItem>
          )} */}
          <DropdownMenuItem
            onClick={() => {
              setIsAlertOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
