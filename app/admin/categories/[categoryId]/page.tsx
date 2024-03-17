import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CategoryForm from "@/app/admin/categories/_components/create-category-form";
import { getSingleCategory } from "@/app/admin/_actions/category-action";

async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const queryClient = new QueryClient();

  //prefetch single category data
  await queryClient.prefetchQuery({
    queryKey: ["category", params.categoryId],
    queryFn: () => getSingleCategory(params.categoryId),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryForm categoryId={params.categoryId} />
      </HydrationBoundary>
    </>
  );
}
export default CategoryPage;
