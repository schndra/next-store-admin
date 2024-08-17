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
        <CustomizeProducts
          colors={data?.colors}
          sizes={data?.sizes}
          productId={data?.id}
        />

        <Add />

        <div className="h-[2px] bg-gray-100" />

        <div className="text-sm">
          <h4 className="font-medium mb-4">PRODUCT INFO</h4>
          <p>
            The Men's Classic White and Grey Hoodie offers a timeless look with
            a comfortable fit. Made from a soft blend of cotton and polyester,
            this hoodie is perfect for casual outings or lounging at home. The
            adjustable drawstring hood and kangaroo pocket add functionality and
            style, making it a versatile piece in your wardrobe.
          </p>
        </div>
        <div className="text-sm mt-1">
          <h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
          <p>
            We want you to be completely satisfied with your purchase. If you
            are not happy with your Men's Classic White and Grey Hoodie, you may
            return it within 30 days of delivery for a full refund or exchange.
            The product must be in its original condition, unworn, and with all
            tags attached. Please note that shipping fees are non-refundable.
          </p>
        </div>

        <div className="text-sm mt-1">
          <h4 className="font-medium mb-4">SHIPPING INFO</h4>
          <p>
            Enjoy fast and reliable shipping on your order. We process and ship
            all orders within 2-3 business days. Standard shipping typically
            takes 5-7 business days, while express options are available at
            checkout for faster delivery. You'll receive a tracking number as
            soon as your Men's Classic White and Grey Hoodie is on its way.
          </p>
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
