import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteCategoryAction } from "@/app/admin/_actions/category-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialogDemo } from "@/components/modals/AlertModal";
import { deleteProductAction } from "../../_actions/product-action";

type DeleteProductBtnProps = {
  id: string;
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

function DeleteProductBtn({ id, variant, size }: DeleteProductBtnProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteProductAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Error deleting product. Let's try again.");
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product Deleted! 🎉 Create another one!");
      router.push("/admin/products/create");
    },
  });

  return (
    <>
      <AlertDialogDemo
        isOpen={isAlertOpen}
        title="Are you absolutely sure?"
        desc="This action cannot be undone. This will permanently delete your
            product"
        onClose={() => {
          setIsAlertOpen(false);
        }}
        onConfirm={() => {
          mutate(id);
        }}
      />
      <Button
        disabled={isPending}
        variant={variant}
        size={size}
        onClick={() => {
          setIsAlertOpen(true);
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}
export default DeleteProductBtn;
