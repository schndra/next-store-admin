"use client";
import { getAllCategoryAction } from "@/app/admin/_actions/category-action";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryAction({}),
  });

  const categories = data?.categories || [];

  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;

  if (categories?.length < 1)
    return <h2 className="text-xl">No categories Found...</h2>;

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`/products?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.img || "/category.png"}
                alt="category_img"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
