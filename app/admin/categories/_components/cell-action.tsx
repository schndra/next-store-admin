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
import { CategoryColumn } from "@/app/admin/categories/_components/columns";
import DeleteCategoryBtn from "@/app/admin/categories/_components/delete-category-btn";
import { toast } from "sonner";

type CellActionProps = {
  data: CategoryColumn;
};

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(data.id);
    toast.success("Category ID has been copied");
  };
  return (
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
          onClick={() => router.push(`/admin/categories/${data.id}`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>

        <DeleteCategoryBtn id={data.id} dropDownMenuItem={true} />

        {/* <Trash className="mr-2 h-4 w-4" />
          Delete */}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
