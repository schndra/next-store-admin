"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "@/app/admin/_components/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditSizeType,
  createAndEditSizeSchema,
} from "@/app/_types/types";
import { CustomFormField } from "@/components/FormComponents";
import { toast } from "sonner";
import {
  createSizeAction,
  getSingleSize,
  updateSizeAction,
} from "@/app/admin/_actions/size-action";
import DeleteSizeBtn from "@/app/admin/sizes/_components/delete-size-btn";

function SizeForm({ sizeId }: { sizeId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["size", sizeId],
    queryFn: () => getSingleSize(sizeId),
  });

  const toastErroMsg = data ? "editing" : "creating";
  const toastSuccessMsg = data ? "updated" : "created";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditSizeType) =>
      data ? updateSizeAction(sizeId, values) : createSizeAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Error ${toastErroMsg} size. Let's try again.`);
        return;
      }
      toast.success(`Size ${toastSuccessMsg}! 🎉 Keep up the great work!`);
      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      queryClient.invalidateQueries({ queryKey: ["size", sizeId] });
      router.push("/admin/sizes");
    },
  });

  const title = data ? "Edit size" : "Create size";
  const description = data ? "Edit a size." : "Add a new size";
  const action = data ? "Save changes" : "Create";

  // Define form.
  const form = useForm<CreateAndEditSizeType>({
    resolver: zodResolver(createAndEditSizeSchema),
    defaultValues: {
      name: data?.name || "",
      value: data?.value || "",
    },
  });

  function onSubmit(values: CreateAndEditSizeType) {
    mutate(values);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <DeleteSizeBtn id={sizeId} variant={"destructive"} size={"sm"} />
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8 ">
            <CustomFormField
              control={form.control}
              name="name"
              placeholder="Size Name"
              labelText="Name"
            />
            <CustomFormField
              control={form.control}
              name="value"
              placeholder="Size Value"
              labelText="Value"
            />
          </div>
          <Button className="ml-auto" type="submit" disabled={isPending}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
export default SizeForm;
