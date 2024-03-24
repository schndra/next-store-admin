import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialogDemo } from "@/components/modals/AlertModal";
import { deleteSizeAction } from "../../_actions/size-action";

type DeleteSizeBtnProps = {
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

function DeleteSizeBtn({ id, variant, size }: DeleteSizeBtnProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteSizeAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Error deleting size. Let's try again.");
        return;
      }

      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      queryClient.invalidateQueries({ queryKey: ["size", id] });
      toast.success("Size Deleted! 🎉 Create another one!");
      router.push("/admin/sizes/create");
    },
  });

  return (
    <>
      <AlertDialogDemo
        isOpen={isAlertOpen}
        title="Are you absolutely sure?"
        desc="This action cannot be undone. This will permanently delete your
            size"
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
export default DeleteSizeBtn;
