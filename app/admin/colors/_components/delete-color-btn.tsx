import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialogDemo } from "@/components/modals/AlertModal";
import { deleteColorAction } from "../../_actions/color-action";

type DeleteColorBtnProps = {
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

function DeleteColorBtn({ id, variant, size }: DeleteColorBtnProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteColorAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Error deleting color. Let's try again.");
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["color", id] });
      toast.success("Color Deleted! 🎉 Create another one!");
      router.push("/admin/colors/create");
    },
  });

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
export default DeleteColorBtn;
