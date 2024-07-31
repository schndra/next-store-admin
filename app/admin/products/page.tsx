import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProductView from "@/app/admin/products/_components/view-product";
import { getAllProductAction } from "@/app/admin/_actions/product-action";

async function CategoriesPage() {
  const queryClient = new QueryClient();

  //prefetch all category data
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductAction(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductView />
      </HydrationBoundary>
    </>
  );
}
export default CategoriesPage;
