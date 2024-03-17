"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "../../_components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryAction } from "../../_actions/category-action";
import { CategoryColumn, columns } from "./columns";
import { format } from "date-fns";
import { DataTable } from "../../_components/data-table";

function CategoryView() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryAction(),
  });

  const formattedCategories: CategoryColumn[] = data!.categories.map(
    (item) => ({
      ...item,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
      updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
    })
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data?.categories.length})`}
          description="Manage categories for your store"
        />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/admin/categories/create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <DataTable
        columns={columns}
        data={formattedCategories}
        searchKey="title"
      />
    </>
  );
}
export default CategoryView;
