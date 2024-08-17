import Add from "@/components/store/Add";
import CustomizeProducts from "@/components/store/CustomizedProducts";
import ProductImages from "@/components/store/ProductImages";

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={"ss"} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">prod name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
          omnis error quidem aliquam ad assumenda aut culpa animi, hic totam?
        </p>
        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">LKR 35</h3>
          <h2 className="font-medium text-2xl">LKR 2500</h2>
        </div>

        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts />

        <Add />

        <div className="h-[2px] bg-gray-100" />

        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>sec desc</p>
        </div>

        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        {/* <Reviews productId={product._id!} /> */}
      </div>
    </div>
  );
};

export default SingleProductPage;
