"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../../../public/upload.png";


type FormValues = {
  productname: string;
  presentstock: string;
  purchaseprice: string;
  sellingprice: string;
  unit: string;
  warranty: string;
  category: string;
  subcategory: string;
  description: string;
  iscopyormarketoriginalororignal: string;
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      productname: "",
      presentstock: "",
      purchaseprice: "",
      sellingprice: "",
      unit: "",
      category: "",
      subcategory: "",
      description: "",
      warranty: "",
      iscopyormarketoriginalororignal:"",
    },
  });

  // preview তৈরি করা
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSubmit = async (data: FormValues) => {
    if (!image) {
      toast.error("Please select an image!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save product");
      toast.success("✅ Product Successfully Saved!");
      reset();
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <form
        className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-3xl border border-purple-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
          Add Product
        </h2>

        {/* Image Upload */}
        <div className="flex items-center justify-center ">
          <div className="bg-gray-100 rounded-xl hover:bg-gray-200 transition duration-200 p-4">
            <label
              htmlFor="image"
              className="flex items-center justify-center cursor-pointer"
            >
              <Image
                src={preview || image1}
                width={120}
                height={120}
                alt="upload"
                className="rounded-lg object-cover"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
        </div>

        {/* Product fields */}
        <div className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            {...register("productname", {
              required: "Product Name is required",
            })}
            placeholder="Product Name"
            className="border border-purple-300 p-2 rounded w-full"
          />
          {errors.productname && (
            <p className="text-red-600 text-sm">{errors.productname.message}</p>
          )}

          <input
            type="number"
            {...register("presentstock", { required: "Stock is required" })}
            placeholder="Present Stock"
            className="border border-purple-300 p-2 rounded w-full"
          />

          <input
            type="number"
            {...register("purchaseprice", {
              required: "Purchase price is required",
            })}
            placeholder="Purchase Price"
            className="border border-purple-300 p-2 rounded w-full"
          />

          <input
            type="number"
            {...register("sellingprice", {
              required: "Selling price is required",
            })}
            placeholder="Selling Price"
            className="border border-purple-300 p-2 rounded w-full"
          />

          <select
            {...register("unit", { required: "Unit is required" })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Unit</option>
            <option value="PCS">PCS</option>
            <option value="Kg">Kg</option>
            <option value="Feet">Feet</option>
            <option value="Number">Number</option>
          </select>
          <select
            {...register("iscopyormarketoriginalororignal", { required: "This field is required" })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Quality</option>
            <option value="copy">Copy</option>
            <option value="marketoriginal">Market Original</option>
            <option value="original">Original</option>
          
          </select>

          <select
            {...register("warranty", { required: "Warranty is required" })}
            className="border p-2 rounded w-full"
          >
            <option value="">Warranty</option>
            <option value="7days">7 Days</option>
            <option value="3month">3 Month</option>
            <option value="6month">6 Month</option>
            <option value="1year">1 Year</option>
          </select>

          <select
            {...register("category", { required: "Category is required" })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="mobile">Mobile</option>
            <option value="battery">Battery</option>
            <option value="charger">Charger</option>
            <option value="headphone">Head Phone</option>
          </select>

          <select
            {...register("subcategory", {
              required: "Sub-category is required",
            })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Sub-category</option>
            <option value="charger">Charger</option>
            <option value="cable">Cable</option>
            <option value="cover">Cover</option>
          </select>

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="border border-purple-300 p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-purple-800 hover:bg-purple-700 text-white p-3 rounded w-full shadow ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddProduct;
