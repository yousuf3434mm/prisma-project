"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type LoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await res.json();
            if(res.ok){
                toast.success("Succefully Login")
            }

            if (!res.ok) {
                throw new Error(result.error || "Login failed!");
            }

            toast.success("Login successful! ✅");
            reset();

            // 🔑 সফল হলে হোমপেজ বা ড্যাশবোর্ডে রিডাইরেক্ট করুন
            router.push("/dashboard");
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
                    Login
                </h2>

                {/* Email Input */}
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        {...register("email", {
                            required: "Email is required",
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

                {/* Password Input */}
                <div className="w-full relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className="border border-purple-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 p-2 rounded w-full transition pr-10"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-2 top-2 text-purple-600 text-lg"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href="/verification"
                        className="text-purple-600 text-sm hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple-800 hover:bg-purple-700 transition text-white p-3 rounded font-semibold w-full shadow disabled:opacity-60"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        If you dont have an account yet,{" "}
                        <Link href="/signup" className="text-purple-600 font-medium hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
