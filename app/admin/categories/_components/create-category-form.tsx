"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAction,
  getSingleCategory,
} from "../../_actions/category-action";
import { useRouter } from "next/navigation";
import Heading from "../../_components/heading";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditCategoryType,
  createAndEditCategorySchema,
} from "@/types/types";
import { CustomFormField } from "@/components/FormComponents";
import { useToast } from "@/components/ui/use-toast";

function CategoryForm({ categoryId }: { categoryId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getSingleCategory(categoryId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditCategoryType) =>
      createCategoryAction(values),
    onSuccess: (data) => {
      if (!data) {
        console.log(data);
        // console.log("there was an error in creating categories");
        toast({ description: "there was an error in creating category" });
        return;
      }
      toast({ description: "category creation successfull" });
      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
      router.push("/admin/categories");
    },
  });

  const title = data ? "Edit category" : "Create category";
  const description = data ? "Edit a category." : "Add a new category";
  const action = data ? "Save changes" : "Create";

  // Define form.
  const form = useForm<CreateAndEditCategoryType>({
    resolver: zodResolver(createAndEditCategorySchema),
    defaultValues: {
      title: "",
      desc: "",
      img: "",
      slug: "",
    },
  });

  function onSubmit(values: CreateAndEditCategoryType) {
    console.log(values);
    mutate({
      ...values,
      slug: values.title.toLowerCase().split(" ").join("-"),
    });
  }

  return (
    <>
      <div className="min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-9.4rem)] mt-4">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
          {data && (
            <Button
              // disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => {}}
            >
              <Trash className="h-4 w-4" />
            </Button>
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
                name="title"
                placeholder="Category Title"
              />
              <CustomFormField
                control={form.control}
                name="desc"
                placeholder="Category Description"
              />
            </div>
            <Button className="ml-auto" type="submit" disabled={isPending}>
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
export default CategoryForm;
