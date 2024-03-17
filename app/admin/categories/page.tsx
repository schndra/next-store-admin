import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getAllCategoryAction } from "@/app/admin/_actions/category-action";
import CategoryView from "@/app/admin/categories/_components/view-category";

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
