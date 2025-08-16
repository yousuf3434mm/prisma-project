"use client";

import React, { useState } from "react";
import { useForm} from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    
};

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
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
           
        },
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to save product");

            const result = await response.json();
            console.log("Saved Product:", result);

            toast.success("Product Successfully Updated!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error saving product");
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
                    Description of product
                </h2>

                
                    {/* Left Side Inputs */}
                    <div className="flex flex-col space-y-4 w-full">
                        {/* Product name & stock */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            

                            <div className="w-full">
                                <input
                                    type="text"
                                    {...register("productname", {
                                        required: "Product name is required",
                                    })}
                                    placeholder="Product Name"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.productname && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.productname.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("presentstock", {
                                        required: "Present stock is required",
                                    })}
                                    placeholder="Present Stock"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.presentstock && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.presentstock.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("purchaseprice", {
                                        required: "Purchase price is required",
                                    })}
                                    placeholder="Purchase Price"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.purchaseprice && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.purchaseprice.message}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <input
                                    type="number"
                                    {...register("sellingprice", {
                                        required: "Selling price is required",
                                    })}
                                    placeholder="Selling Price"
                                    className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                                />
                                {errors.sellingprice && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.sellingprice.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Unit */}
                        <div className="w-full">
                            <select
                                {...register("unit", {
                                    required: "Unit is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="" className="bg-purple-800 text-white">Select Unit</option>
                                <option value="PCS" className="bg-purple-800 text-white">PCS</option>
                                <option value="Kg" className="bg-purple-800 text-white">Kg</option>
                                <option value="Feet" className="bg-purple-800 text-white">Feet</option>
                                <option value="Number" className="bg-purple-800 text-white">Number</option>
                            </select>
                            {errors.unit && (
                                <p className="text-red-600 text-sm mt-1">{errors.unit.message}</p>
                            )}
                        </div>
                        {/* Warranty */}
                        <div className="w-full">
                            <select
                                {...register("warranty", {
                                    required: "Warranty is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="">Warranty</option>
                                <option value="No Warranty" className="bg-purple-800 text-white">No Warranty</option>
                                <option value="7 days" className="bg-purple-800 text-white">7 Days</option>
                                <option value="3 month" className="bg-purple-800 text-white">3 Month</option>
                                <option value="6 month" className="bg-purple-800 text-white">6 Month</option>
                                <option value="1 year" className="bg-purple-800 text-white">1 Year</option>
                                <option value="2 year" className="bg-purple-800 text-white">2 Year</option>
                            </select>
                            {errors.warranty && (
                                <p className="text-red-600 text-sm mt-1">{errors.warranty.message}</p>
                            )}
                        </div>

                        {/* Category */}
                       <div className="flex gap-4">
                         <div className="w-full">
                            <select
                                {...register("category", {
                                    required: "Category is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="" className="bg-purple-800 text-white">Select Category</option>
                                <option value="Mobile" className="bg-purple-800 text-white">Mobile</option>
                                <option value="Battery" className="bg-purple-800 text-white">Battery</option>
                                <option value="Charger" className="bg-purple-800 text-white">Charger</option>
                                <option value="Head Phone" className="bg-purple-800 text-white">Head Phone</option>
                                <option value="Cable" className="bg-purple-800 text-white">Cable</option>
                                <option value="Cover" className="bg-purple-800 text-white">Cover</option>
                                <option value="Remote" className="bg-purple-800 text-white">Remote</option>
                                <option value="Stand" className="bg-purple-800 text-white">Stand</option>
                                <option value="Memory & Pendrive" className="bg-purple-800 text-white">Memory & Pendrive</option>
                                <option value="Backshall" className="bg-purple-800 text-white">Backshall</option>
                                <option value="Casing" className="bg-purple-800 text-white">Casing</option>
                                <option value="Logic" className="bg-purple-800 text-white">Logic</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Subcategory */}
                        <div className="w-full">
                            <select
                                {...register("subcategory", {
                                    required: "Sub-category is required",
                                })}
                                className="w-full border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 rounded px-3 py-2"
                            >
                                <option value="" className="bg-purple-800 text-white">Select Sub-category</option>
                                <option value="Charger" className="bg-purple-800 text-white">Charger</option>
                                <option value="Cable" className="bg-purple-800 text-white">Cable</option>
                                <option value="Cover" className="bg-purple-800 text-white">Cover</option>
                            </select>
                            {errors.subcategory && (
                                <p className="text-red-600 text-sm mt-1">{errors.subcategory.message}</p>
                            )}
                        </div>
                       </div>

                        {/* Description */}
                        <div className="w-full">
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                placeholder="Description"
                                className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>
                    </div>

                   

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow flex justify-center items-center ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {loading && (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                            ></path>
                        </svg>
                    )}
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddProduct;
