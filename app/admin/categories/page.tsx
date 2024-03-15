import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CategoryView from "./_components/view-category";

async function CategoriesPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryView />
      </HydrationBoundary>
    </>
  );
}
export default CategoriesPage;
