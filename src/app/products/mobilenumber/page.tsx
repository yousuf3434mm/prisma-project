
import { PrismaClient } from "@prisma/client";
import AllNumbers from '../../../components/Products/AllNumber';

const prisma = new PrismaClient();

const Page = async () => {
  const phoneNumbers = await prisma.user.findMany({});

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
          📦 All Mobile No
        </h1>

              {phoneNumbers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {phoneNumbers.map((number) => (
              <AllNumbers key={number.id} number={number} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No numbers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
