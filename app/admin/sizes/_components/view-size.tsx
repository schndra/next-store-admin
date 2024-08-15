"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "@/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryAction } from "@/app/admin/_actions/category-action";
import { SizeColumn, columns } from "./columns";
import { format } from "date-fns";
import { DataTable } from "@/app/admin/_components/data-table";
import { getAllSizeAction } from "../../_actions/size-action";

function SizeView() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizeAction(),
  });

  const formattedSizes: SizeColumn[] = data!.sizes.map((item) => ({
    ...item,
    createdAt: format(item.createdAt!, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt!, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data?.sizes.length})`}
          description="Manage sizes for your store"
        />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/admin/sizes/create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <DataTable columns={columns} data={formattedSizes} searchKey="name" />
    </>
  );
}
export default SizeView;
