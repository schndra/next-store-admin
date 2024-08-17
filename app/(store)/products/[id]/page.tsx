import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SingleProductView from "../_components/SingleProductView";
import { getSingleProduct } from "@/app/admin/_actions/product-action";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  //prefetch single product data
  await queryClient.prefetchQuery({
    queryKey: ["product", params.id],
    queryFn: () => getSingleProduct(params.id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleProductView productId={params.id} />
      </HydrationBoundary>
    </>
  );
};

export default SingleProductPage;
