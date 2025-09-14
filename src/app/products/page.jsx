import AllProducts from "@/components/Products/AllProducts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Page = async () => {
  const products = await prisma.product.findMany({});

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
          📦 All Products
        </h1>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <AllProducts key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;



