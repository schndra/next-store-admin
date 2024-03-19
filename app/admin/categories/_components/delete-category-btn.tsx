import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteCategoryAction } from "@/app/admin/_actions/category-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type DeleteCategoryBtnProps = {
  id: string;
  dropDownMenuItem?: Boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

function DeleteCategoryBtn({
  id,
  variant,
  size,
  dropDownMenuItem = false,
}: DeleteCategoryBtnProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteCategoryAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Error deleting category. Let's try again.");
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      toast.success("Category Deleted! 🎉 Create another one!");
      if (!dropDownMenuItem) {
        router.push("/admin/categories/create");
      }
    },
  });

  if (dropDownMenuItem) {
    return (
      <DropdownMenuItem
        onClick={() => {
          mutate(id);
        }}
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    );
  }

  return (
    <Button
      disabled={isPending}
      variant={variant}
      size={size}
      onClick={() => {
        mutate(id);
      }}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
export default DeleteCategoryBtn;
