"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/app/admin/colors/_components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  value: string;
  name: string;
  // createdUserId: string;
  // updatedUserId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
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
