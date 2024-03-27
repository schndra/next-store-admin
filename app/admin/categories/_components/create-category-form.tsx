"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAction,
  getAllCategoryAction,
  getSingleCategory,
  updateCategoryAction,
} from "@/app/admin/_actions/category-action";
import Heading from "@/app/admin/_components/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditCategoryType,
  createAndEditCategorySchema,
} from "@/app/_types/types";
import { CustomFormField } from "@/components/FormComponents";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import DeleteCategoryBtn from "@/app/admin/categories/_components/delete-category-btn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CategoryForm({ categoryId }: { categoryId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getSingleCategory(categoryId),
  });
  const { data: mainCategoryData } = useQuery({
    queryKey: ["categories", "main"],
    queryFn: () => getAllCategoryAction({ type: "main" }),
  });

  const toastErroMsg = data ? "editing" : "creating";
  const toastSuccessMsg = data ? "updated" : "created";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditCategoryType) =>
      data
        ? updateCategoryAction(categoryId, values)
        : createCategoryAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Error ${toastErroMsg} category. Let's try again.`);
        return;
      }
      toast.success(`Category ${toastSuccessMsg}! 🎉 Keep up the great work!`);
      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
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
      title: data?.title || "",
      desc: data?.desc || "",
      img: data?.img || "",
      slug: data?.slug || "",
      parentId: data?.parentId || "unassigned",
      isMainCategory: data?.isMainCategory || true,
    },
  });

  function onSubmit(values: CreateAndEditCategoryType) {
    const isMainCategory = values.parentId === "unassigned";
    const mainCat = mainCategoryData?.categories.find(
      (cat) => cat.id === values.parentId
    );

    let slug: string;
    if (isMainCategory) {
      slug = values.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    } else {
      slug = `${mainCat?.title} ${values.title}`
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    }

    mutate({
      ...values,
      parentId: isMainCategory ? null : values.parentId,
      isMainCategory,
      slug,
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <DeleteCategoryBtn
            id={categoryId}
            variant={"destructive"}
            size={"sm"}
          />
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* image upload */}
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8 ">
            <CustomFormField
              control={form.control}
              name="title"
              placeholder="Category Title"
              labelText="Title"
            />
            <CustomFormField
              control={form.control}
              name="desc"
              placeholder="Category Description"
              labelText="Description"
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">Main Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ? field.value : "unassigned"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unassigned">unassigned</SelectItem>
                      {mainCategoryData?.categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
export default CategoryForm;
