import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CategoryView from "./_components/view-category";
import { getAllCategoryAction } from "../_actions/category-action";

async function CategoriesPage() {
  const queryClient = new QueryClient();

  //prefetch all category data
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryAction(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryView />
      </HydrationBoundary>
    </>
  );
}
export default CategoriesPage;
