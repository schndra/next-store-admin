import {
  getAllProductAction,
  getProductSearchAction,
} from "@/app/admin/_actions/product-action";
import Filter from "@/components/store/Filter";
import ProductList from "@/components/store/ProductList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";

const ProductsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", "", "", "", "", "", "", 1],
    queryFn: () => getProductSearchAction({}),
  });

  // console.log(searchParams);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
          {/* CAMPAIGN */}
          <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
            <div className="w-2/3 flex flex-col items-center justify-center gap-8">
              <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
                Grab up to 50% off on
                <br /> Selected Products
              </h1>
              <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
                Buy Now
              </button>
            </div>
            <div className="relative w-1/3">
              <Image src="/woman.png" alt="" fill className="object-contain" />
            </div>
          </div>
          {/* FILTER */}
          <Filter />
          {/* PRODUCTS */}
          <h1 className="mt-12 text-xl font-semibold">Clothes For You!</h1>
          <ProductList />
        </div>
      </HydrationBoundary>
    </>
  );
};

export default ProductsPage;
