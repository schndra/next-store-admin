"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "@/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProductColumn, columns } from "./columns";
import { format } from "date-fns";
import { DataTable } from "@/app/admin/_components/data-table";
import { getAllProductAction } from "@/app/admin/_actions/product-action";

function ProductView() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductAction(),
  });

  const formattedProducts: ProductColumn[] = data!.products.map((item) => ({
    ...item,
    mainCategory: item.category?.parent?.title,
    category: item.category?.title,
    // color: item.color?.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
    sizes: item.sizes?.map((i) => i.value),
    colors: item.colors?.map((i) => i.value),
    price: item.price.toString(),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data?.products.length})`}
          description="Manage products for your store"
        />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/admin/products/create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <DataTable columns={columns} data={formattedProducts} searchKey="title" />
    </>
  );
}
export default ProductView;
