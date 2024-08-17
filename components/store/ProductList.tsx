"use client";

import { getProductSearchAction } from "@/app/admin/_actions/product-action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  params,
  limit,
}: {
  params?: {
    isFeatured?: boolean;
    orderBy: string;
  };
  limit?: number;
}) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const cat = searchParams.get("cat") || "";
  const sort = searchParams.get("sort") || "" || params?.orderBy!;
  const isFeatured = params?.isFeatured;

  // const type = searchParams.get("type") || "physical";
  // console.log(min, max, cat, sort);
  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending, refetch } = useQuery({
    queryKey: [
      "products",
      search ?? "",
      isFeatured,
      min,
      max,
      cat,
      sort,
      pageNumber,
    ],
    queryFn: () =>
      getProductSearchAction({
        search,
        min,
        max,
        cat,
        sort,
        page: pageNumber,
        isFeatured,
        limit,
      }),
  });

  const products = data?.products || [];
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    refetch();
  }, [search, min, max, cat, sort, refetch]);

  // console.log(products);

  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;

  if (products.length < 1)
    return <h2 className="text-xl">No products Found...</h2>;

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.images![0].url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            <Image
              src={product.images![1].url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.title}</span>
            <span className="font-semibold">
              LKR {product.price.toString()}
            </span>
          </div>

          <div className="text-sm text-gray-500"> {product.desc}</div>

          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
