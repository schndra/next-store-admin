"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "@/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ColorColumn, columns } from "./columns";
import { format } from "date-fns";
import { DataTable } from "@/app/admin/_components/data-table";
import { getAllColorAction } from "../../_actions/color-action";

function ColorView() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getAllColorAction(),
  });

  const formattedColors: ColorColumn[] = data!.colors.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.colors.length})`}
          description="Manage colors for your store"
        />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/admin/colors/create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <DataTable columns={columns} data={formattedColors} searchKey="name" />
    </>
  );
}
export default ColorView;
