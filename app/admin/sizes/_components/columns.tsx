"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/admin/sizes/_components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
  id: string;
  value: string;
  name: string;
  // createdUserId: string;
  // updatedUserId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },

  // {
  //   accessorKey: "createdUserId",
  //   header: "Created By",
  // },
  // {
  //   accessorKey: "updatedUserId",
  //   header: "Updated By",
  // },
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
