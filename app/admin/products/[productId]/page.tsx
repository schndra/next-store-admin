import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProductForm from "@/app/admin/products/_components/create-product-form";
import { getSingleProduct } from "@/app/admin/_actions/product-action";

async function CategoryPage({ params }: { params: { productId: string } }) {
  const queryClient = new QueryClient();

  //prefetch single product data
  await queryClient.prefetchQuery({
    queryKey: ["product", params.productId],
    queryFn: () => getSingleProduct(params.productId),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductForm productId={params.productId} />
      </HydrationBoundary>
    </>
  );
}
export default CategoryPage;
