"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "@/app/admin/_components/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditColorType,
  createAndEditColorSchema,
} from "@/app/_types/types";
import { CustomFormField } from "@/components/FormComponents";
import { toast } from "sonner";
import {
  createColorAction,
  getSingleColor,
  updateColorAction,
} from "@/app/admin/_actions/color-action";
import DeleteColorBtn from "@/app/admin/colors/_components/delete-color-btn";
import { Input } from "@/components/ui/input";

function ColorForm({ colorId }: { colorId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["color", colorId],
    queryFn: () => getSingleColor(colorId),
  });

  const toastErroMsg = data ? "editing" : "creating";
  const toastSuccessMsg = data ? "updated" : "created";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditColorType) =>
      data ? updateColorAction(colorId, values) : createColorAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Error ${toastErroMsg} color. Let's try again.`);
        return;
      }
      toast.success(`Color ${toastSuccessMsg}! 🎉 Keep up the great work!`);
      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["color", colorId] });
      router.push("/admin/colors");
    },
  });

  const title = data ? "Edit color" : "Create color";
  const description = data ? "Edit a color." : "Add a new color";
  const action = data ? "Save changes" : "Create";

  // Define form.
  const form = useForm<CreateAndEditColorType>({
    resolver: zodResolver(createAndEditColorSchema),
    defaultValues: {
      name: data?.name || "",
      value: data?.value || "",
    },
  });

  function onSubmit(values: CreateAndEditColorType) {
    mutate(values);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <DeleteColorBtn id={colorId} variant={"destructive"} size={"sm"} />
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
              placeholder="Color Name"
              labelText="Name"
            />
            {/* <CustomFormField
              control={form.control}
              name="value"
              placeholder="Color Value"
              labelText="Value"
            /> */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
export default ColorForm;
