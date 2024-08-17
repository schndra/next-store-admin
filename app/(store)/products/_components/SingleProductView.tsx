"use client";
import { getSingleProduct } from "@/app/admin/_actions/product-action";
import Add from "@/components/store/Add";
import CustomizeProducts from "@/components/store/CustomizedProducts";
import ProductImages from "@/components/store/ProductImages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function SingleProductView({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={data?.images} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">prod name</h1>
        <p className="text-gray-500">{data?.desc}</p>
        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">LKR 35</h3>
          <h2 className="font-medium text-2xl">LKR {data?.price.toString()}</h2>
        </div>

        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts colors={data?.colors} sizes={data?.sizes} />

        <Add />

        <div className="h-[2px] bg-gray-100" />

        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>sec desc</p>
        </div>

        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        {/* <Reviews productId={product._id!} /> */}
      </div>
    </div>
  );
}
export default SingleProductView;
