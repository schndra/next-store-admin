"use server";

import { getCurrentUser } from "@/lib/current-user";
import {
  CategoryType,
  CreateAndEditCategoryType,
  CreateAndEditProductType,
  ProductType,
  createAndEditCategorySchema,
  createAndEditProductSchema,
} from "@/app/_types/types";
import prisma from "@/utils/db";
import { Prisma, UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

async function authenticateAndRedirect() {
  const currUser = await getCurrentUser();

  if (!currUser?.id && currUser?.role !== UserRole.ADMIN) redirect("/");
  return currUser;
}

export async function createProductAction(
  values: CreateAndEditProductType
): Promise<ProductType | null> {
  //todo check user role
  //todo get user id and set in category creatorId
  const { id } = await authenticateAndRedirect();

  if (!id) {
    return null;
  }

  try {
    createAndEditProductSchema.parse(values);

    const {
      categoryId,
      createdBy,
      desc,
      images,
      price,
      slug,
      title,
      isFeatured,
      colors,
      // colorId,
      sizes,
    } = values;

    const product: ProductType = await prisma.product.create({
      data: {
        // createdUserId: id,
        title,
        isFeatured,
        slug,
        price,
        desc,
        createdBy: id,
        categoryId,
        // colorId,
        // sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        sizes: {
          connect: sizes,
        },
        colors: {
          connect: colors,
        },
      },
      include: {
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateProductAction(
  id: string,
  values: CreateAndEditProductType
): Promise<ProductType | null> {
  // todo check user role
  const { id: currUserId } = await authenticateAndRedirect();

  if (!currUserId) {
    return null;
  }
  const {
    categoryId,
    createdBy,
    desc,
    images,
    price,
    slug,
    title,
    isFeatured,
    colors,
    sizes,
  } = values;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        isFeatured,
        slug,
        price,
        desc,
        createdBy: currUserId,
        categoryId,
        // colorId,

        images: {
          deleteMany: {},
        },
        sizes: {
          set: sizes.map((item) => ({ id: item.id })),
        },
        colors: {
          set: colors.map((item) => ({ id: item.id })),
        },
      },
    });

    const product: ProductType = await prisma.product.update({
      where: {
        id,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return product;
  } catch (error) {
    return null;
  }
}

export async function deleteProductAction(
  id: string
): Promise<ProductType | null> {
  //todo check user role
  await authenticateAndRedirect();

  try {
    const product: ProductType = await prisma.product.delete({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllProductAction(): Promise<{
  products: ProductType[];
} | null> {
  try {
    const products: ProductType[] = await prisma.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        sizes: true,
        colors: true,
      },
    });

    return { products };
  } catch (error) {
    return null;
  }
}

export async function getSingleProduct(
  id: string
): Promise<ProductType | null> {
  let product: ProductType | null = null;

  //todo check if user has the role admin

  try {
    product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        sizes: true,
        colors: true,
        images: true,
      },
    });
  } catch (error) {
    product = null;
  }
  // if (!product) {
  //   redirect("/admin/categories/create");
  // }
  return product;
}

type GetProductSearchActionTypes = {
  search?: string;
  page?: number;
  limit?: number;
  min?: string;
  max?: string;
  cat?: string;
  isFeatured?: boolean;
  sort: string;
};

export async function getProductSearchAction({
  search,
  page = 1,
  limit = 10,
  min,
  max,
  cat,
  sort = "desc",
  isFeatured,
}: GetProductSearchActionTypes): Promise<{
  products: ProductType[];
  count: number;
  page: number;
  totalPages: number;
} | null> {
  // console.log(sort);
  try {
    let whereClause: Prisma.ProductWhereInput = {};

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            title: {
              contains: search,
            },
          },
        ],
      };
    }

    // Add category filter
    if (cat) {
      whereClause = {
        ...whereClause,
        category: {
          slug: cat,
        },
      };
    }

    if (typeof isFeatured === "boolean") {
      whereClause = {
        ...whereClause,
        isFeatured: isFeatured,
      };
    }

    // Add price range filter
    if (min || max) {
      whereClause = {
        ...whereClause,
        price: {
          gte: min ? parseFloat(min) : undefined,
          lte: max ? parseFloat(max) : undefined,
        },
      };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = sort
      ? { [sort.split(" ")[1]]: sort.split(" ")[0] } // Sort based on the 'sort' parameter
      : { createdAt: "desc" };

    console.log(orderBy, "hey");

    const skip = (page - 1) * limit;

    const products: ProductType[] = await prisma.product.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy,
      include: {
        category: {
          include: {
            parent: true,
          },
        },
        images: true,
        sizes: true,
        colors: true,
      },
    });

    const count: number = await prisma.product.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { products, count, page, totalPages };
  } catch (error) {
    return { products: [], count: 0, page: 1, totalPages: 0 };
  }
}
