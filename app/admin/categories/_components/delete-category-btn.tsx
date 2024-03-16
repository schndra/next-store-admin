import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteCategoryAction } from "../../_actions/category-action";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function DeleteCategoryBtn({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteCategoryAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "Error deleting category. Let's try again.",
        });
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      toast({
        description: "Category Deleted! 🎉 Create another one!",
      });
      router.push("/admin/categories/create");
    },
  });

  return (
    <Button
      disabled={isPending}
      variant="destructive"
      size="sm"
      onClick={() => {
        mutate(id);
      }}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
export default DeleteCategoryBtn;
