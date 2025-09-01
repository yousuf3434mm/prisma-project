"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Product = {
  id: string;
  productname: string;
  sellingprice: number;
  quantity: number;
};

type CheckoutFormValues = {
  fullName: string;
  email: string;
  village: string;
  po:string;
  postcode:number;
  upazilla:string;
  zilla:string;
  paymentMethod: string;
};

const CheckOut = () => {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>();

  useEffect(() => {
    const items = localStorage.getItem("checkoutItems");
    if (items) {
      setCheckoutItems(JSON.parse(items));
    }
  }, []);

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.sellingprice * item.quantity, 0);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: checkoutItems,
          totalAmount: totalPrice,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast("✅ Order placed successfully!");
        localStorage.removeItem("checkoutItems"); // clear cart
        router.push("/ordersuccess");
      } else {
        alert("❌ Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error placing order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Billing & Shipping Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Billing & Shipping</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input placeholder="Enter your name here"
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            
            <input placeholder="Email"
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            
            <input placeholder="Village"
              {...register("village", { required: "Village is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></input>
            {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village.message}</p>}
          </div>
          <div>
            
            <input placeholder="Post Office"
              {...register("po", { required: "Post office is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></input>
            {errors.po && <p className="text-red-500 text-xs mt-1">{errors.po.message}</p>}
          </div>
          <div>
            
            <input placeholder="Post Code"
              {...register("postcode", { required: "Post code is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></input>
            {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode.message}</p>}
          </div>
          <div>
            
            <input placeholder="Upazilla"
              {...register("upazilla", { required: "Upazilla is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></input>
            {errors.upazilla && <p className="text-red-500 text-xs mt-1">{errors.upazilla.message}</p>}
          </div>
          <div>
            
            <input placeholder="Zilla"
              {...register("zilla", { required: "Zilla is required" })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></input>
            {errors.zilla && <p className="text-red-500 text-xs mt-1">{errors.zilla.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="space-y-2">
              {["Cash on Delivery", "Credit/Debit Card", "Mobile Banking"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input type="radio" value={method} {...register("paymentMethod", { required: "Please select a payment method" })} />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-purple-50 p-6 rounded-2xl shadow-inner">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Order</h2>
        {checkoutItems.length > 0 ? (
          <div className="space-y-4">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700 border-b pb-2">
                <span>{item.productname} (x{item.quantity})</span>
                <span>৳{item.sellingprice * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-4 flex justify-between font-bold text-gray-900">
              <span>Total:</span>
              <span>৳{totalPrice}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No items in checkout.</p>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
