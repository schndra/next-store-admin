import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SizeForm from "@/app/admin/sizes/_components/create-size-form";
import { getSingleSize } from "@/app/admin/_actions/size-action";

async function SizePage({ params }: { params: { sizeId: string } }) {
  const queryClient = new QueryClient();

  //prefetch single category data
  await queryClient.prefetchQuery({
    queryKey: ["size", params.sizeId],
    queryFn: () => getSingleSize(params.sizeId),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SizeForm sizeId={params.sizeId} />
      </HydrationBoundary>
    </>
  );
}
export default SizePage;
