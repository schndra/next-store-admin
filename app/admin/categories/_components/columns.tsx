"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  //   amount: number;
  //   status: "pending" | "processing" | "success" | "failed";
  //   email: string;
  //   id: string;
  title: string;
  desc: string;
  img?: string | null;
  slug: string;
  //   products?: any[]; // change later
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
