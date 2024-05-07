import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ColorView from "@/app/admin/colors/_components/view-color";
import { getAllColorAction } from "../_actions/color-action";

async function ColorsPage() {
  const queryClient = new QueryClient();

  //prefetch all category data
  await queryClient.prefetchQuery({
    queryKey: ["colors"],
    queryFn: () => getAllColorAction(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ColorView />
      </HydrationBoundary>
    </>
  );
}
export default ColorsPage;
