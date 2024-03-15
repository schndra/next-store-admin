"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "../../_components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


function CategoryView() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-9.4rem)] mt-4">
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${0})`}
          description="Manage categories for your store"
        />
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/admin/categories/create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <h1>Stats Pages</h1>
      {/* <div>{session?.user.name}</div>
    <div>{session?.user.role}</div> */}
    </div>
  );
}
export default CategoryView;
