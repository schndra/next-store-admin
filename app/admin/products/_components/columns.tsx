"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/admin/products/_components/cell-action";
import { Decimal } from "@prisma/client/runtime/library";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;

  title: string;
  desc: string;
  slug: string;

  price: string;
  isFeatured?: boolean;
  mainCategory?: string;
  category?: string;
  colors?: string[];
  sizes?: string[];

  createdAt: Date | string;
  updatedAt: Date | string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  // {
  //   accessorKey: "slug",
  //   header: "Slug",
  // },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "mainCategory",
    header: "Main Category",
  },
  {
    accessorKey: "category",
    header: "Sub Category",
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.sizes?.map((i) => (
          <Badge
            variant="secondary"
            key={i}
            className="rounded-sm px-1 gap-1 font-normal"
          >
            {i}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.colors?.map((item, i) => (
          <Badge
            variant="secondary"
            key={i}
            className="rounded-full p-2 font-normal"
            style={{ backgroundColor: item }}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
