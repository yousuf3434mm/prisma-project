


import Link from "next/link";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <Link href="/">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
