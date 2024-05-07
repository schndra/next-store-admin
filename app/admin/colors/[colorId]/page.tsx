import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ColorForm from "@/app/admin/colors/_components/create-color-form";
import { getSingleColor } from "@/app/admin/_actions/color-action";

async function ColorPage({ params }: { params: { colorId: string } }) {
  const queryClient = new QueryClient();

  //prefetch single category data
  await queryClient.prefetchQuery({
    queryKey: ["color", params.colorId],
    queryFn: () => getSingleColor(params.colorId),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ColorForm colorId={params.colorId} />
      </HydrationBoundary>
    </>
  );
}
export default ColorPage;
