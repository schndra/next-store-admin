"use client";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleCategory } from "../../_actions/category-action";
import { useRouter } from "next/navigation";
import Heading from "../../_components/heading";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditCategoryType,
  createAndEditCategorySchema,
} from "@/utils/schemas";
import { CustomFormField } from "@/components/FormComponents";

function CategoryForm({ categoryId }: { categoryId: string }) {
  // const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getSingleCategory(categoryId),
  });

  const title = data ? "Edit category" : "Create category";
  const description = data ? "Edit a category." : "Add a new category";
  const action = data ? "Save changes" : "Create";

  const form = useForm<CreateAndEditCategoryType>({
    resolver: zodResolver(createAndEditCategorySchema),
    defaultValues: {
      title: "",
      desc: "",
      img: "",
      slug: "",
    },
  });

  console.log(data);

  function onSubmit() {}

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
                name="Title"
                placeholder="Category Title"
              />
              <CustomFormField
                control={form.control}
                name="desc"
                placeholder="Category Description"
              />
            </div>
            <Button className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
export default CategoryForm;
