import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getAllSizeAction } from "@/app/admin/_actions/size-action";
import SizeView from "@/app/admin/sizes/_components/view-size";

async function SizesPage() {
  const queryClient = new QueryClient();

  //prefetch all category data
  await queryClient.prefetchQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizeAction(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SizeView />
      </HydrationBoundary>
    </>
  );
}
export default SizesPage;
