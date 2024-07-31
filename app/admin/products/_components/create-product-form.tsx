"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Heading from "@/app/admin/_components/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAndEditProductType,
  createAndEditProductSchema,
} from "@/app/_types/types";
import { CustomFormField } from "@/components/FormComponents";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import DeleteProductBtn from "@/app/admin/products/_components/delete-product-btn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createProductAction,
  getSingleProduct,
  updateProductAction,
} from "@/app/admin/_actions/product-action";
import { useCallback } from "react";
import { getAllCategoryAction } from "../../_actions/category-action";
import { getAllSizeAction } from "../../_actions/size-action";
import { getAllColorAction } from "../../_actions/color-action";
import { Checkbox } from "@/components/ui/checkbox";

function ProductForm({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
  });
  //main categories with their sub categories
  const { data: mainCategoryData } = useQuery({
    queryKey: ["categories", "main"],
    queryFn: () => getAllCategoryAction({ type: "main" }),
  });
  //sizes
  const { data: sizeData } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizeAction(),
  });
  //colors
  const { data: colorData } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getAllColorAction(),
  });

  const toastErroMsg = data ? "editing" : "creating";
  const toastSuccessMsg = data ? "updated" : "created";

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditProductType) =>
      data
        ? updateProductAction(productId, values)
        : createProductAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast.error(`Error ${toastErroMsg} product. Let's try again.`);
        return;
      }
      toast.success(`Product ${toastSuccessMsg}! 🎉 Keep up the great work!`);
      //inavildate queries
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      router.push("/admin/products");
    },
  });

  const title = data ? "Edit product" : "Create product";
  const description = data ? "Edit a product." : "Add a new product";
  const action = data ? "Save changes" : "Create";

  // Define form.
  const form = useForm<CreateAndEditProductType>({
    resolver: zodResolver(createAndEditProductSchema),
    defaultValues: {
      title: data?.title || "",
      desc: data?.desc || "",
      // img: data?.img || "",
      slug: data?.slug || "",
      images: data?.images
        ? data.images.map((image) => ({ url: image.url }))
        : [] || [],
      price: data?.price ? parseFloat(String(data.price)) : 0,
      categoryId: data?.categoryId || "",
      colorId: data?.colorId || "",
      sizeId: data?.sizeId || "",
      isFeatured: data?.isFeatured || false,
      createdBy: data?.createdBy || "",
    },
    shouldUnregister: false,
  });

  function onSubmit(values: CreateAndEditProductType) {
    // console.log("is this working");
    console.log(values);
    mutate(values);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <DeleteProductBtn
            id={productId}
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
            name="images"
            render={
              ({ field }) => {
                // let val = ;
                // console.log(field.value);

                let val = [...field.value];

                return (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={val.map((image) => image.url)}
                        disabled={isPending}
                        onChange={(url) =>
                          // field.onChange([...field.value, { url }])
                          {
                            val = [...val, { url }];
                            // console.log(val, "test");
                            field.onChange([...val]);
                          }
                        }
                        onRemove={(url) => {
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }
              // (

              // )
            }
          />
          <div className="md:grid md:grid-cols-3 gap-8 ">
            <CustomFormField
              control={form.control}
              name="title"
              placeholder="Product Title"
              labelText="Title"
            />
            <CustomFormField
              control={form.control}
              name="desc"
              placeholder="Product Description"
              labelText="Description"
            />
            <CustomFormField
              control={form.control}
              name="price"
              placeholder="Product Price"
              labelText="Price"
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value="unassigned">unassigned</SelectItem> */}
                      {mainCategoryData?.categories.map((cat) => (
                        <SelectGroup key={cat.slug}>
                          <SelectLabel>{cat.title}</SelectLabel>
                          {cat.subCategories?.map((subCat) => (
                            <SelectItem key={subCat.slug} value={subCat.id}>
                              {subCat.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    // disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizeData?.sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          ({size.value}) {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colorData?.colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
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
export default ProductForm;
