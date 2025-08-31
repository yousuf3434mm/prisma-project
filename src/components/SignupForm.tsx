"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SignUpFormValues = {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    gender: string;
};

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        defaultValues: {
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            terms: false,
            gender: "",
        },
    });

    const password = watch("password");
    const [showPassword, setShowPassword] = useState(false);

    // Password validation rules
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);

    useEffect(() => {
        setHasUpperCase(/[A-Z]/.test(password));
        setHasLowerCase(/[a-z]/.test(password));
        setHasNumber(/[0-9]/.test(password));
        setHasSpecialChar(/[!@#$%^&*]/.test(password));
        setHasMinLength(password.length >= 8);
    }, [password]);

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            // backend এ confirmPassword পাঠাচ্ছি না
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    terms: data.terms,
                    gender: data.gender,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Signup failed!");
            }

            toast.success("Account created successfully!");
            reset();
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message || "Something went wrong!");
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-purple-200"
            >
                <h2 className="text-center text-2xl font-bold text-purple-800 mb-6">
                    Sign Up
                </h2>

                {/* Name */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("username", { required: "Name is required" })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.username && (
                        <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            validate: (value) =>
                                value.endsWith("@gmail.com") ||
                                value.endsWith("@yahoo.com") ||
                                "Only Gmail or Yahoo email is allowed",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10,14}$/,
                                message: "Invalid phone number",
                            },
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Gender */}
                <div className="w-full">
                    <p className="mb-2 font-semibold text-gray-700">Gender</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="Male"
                                {...register("gender", { required: "Please select your gender" })}
                            />
                            <span>Male</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="Female"
                                {...register("gender", { required: "Please select your gender" })}
                            />
                            <span>Female</span>
                        </label>
                        
                    </div>
                    {errors.gender && (
                        <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="w-full relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            validate: () =>
                                (hasUpperCase &&
                                    hasLowerCase &&
                                    hasNumber &&
                                    hasSpecialChar &&
                                    hasMinLength) ||
                                "Password does not meet all requirements",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}

                    {/* Password rules */}
                    <div className="mt-2 space-y-1 text-sm">
                        <p className={hasUpperCase ? "text-green-600" : "text-red-600"}>
                            • At least one uppercase letter (A-Z)
                        </p>
                        <p className={hasLowerCase ? "text-green-600" : "text-red-600"}>
                            • At least one lowercase letter (a-z)
                        </p>
                        <p className={hasNumber ? "text-green-600" : "text-red-600"}>
                            • At least one number (0-9)
                        </p>
                        <p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
                            • At least one special character (!@#$%^&*)
                        </p>
                        <p className={hasMinLength ? "text-green-600" : "text-red-600"}>
                            • Minimum 8 characters
                        </p>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Show password toggle */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="text-sm text-gray-700">Show Password</label>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        {...register("terms", {
                            required: "You must accept the terms and conditions",
                        })}
                    />
                    <label className="text-sm text-gray-700">
                        I accept the{" "}
                        <span className="text-purple-800 underline cursor-pointer">
                            terms and conditions
                        </span>
                    </label>
                </div>
                {errors.terms && (
                    <p className="text-red-600 text-sm mt-1">{errors.terms.message}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow disabled:opacity-50"
                >
                    {isSubmitting ? "Creating..." : "Create Account"}
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-purple-600 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default SignupForm;
