"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // optional icon package

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-purple-800 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold">MyBrand</span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/products" className="hover:text-purple-200 transition">Products</Link>
                        <Link href="/signup" className="hover:text-purple-200 transition">Signup Form</Link>
                        <Link href="/products/addproducts" className="hover:text-purple-200 transition">Add Products</Link>
                        <Link href="/login" className="hover:text-purple-200 transition">Login</Link>
                        <Link href="/products/mobilenumber" className="hover:text-purple-200 transition">Mobile No:</Link>
                        <Link href="/purchasehistory" className="hover:text-purple-200 transition">Purchase History</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-purple-700">
                    <Link href="/productcard" className="block text-white hover:text-purple-200 transition">Product Card</Link>
                    <Link href="/signupform" className="block text-white hover:text-purple-200 transition">Signup Form</Link>
                    <Link href="/addproducts" className="block text-white hover:text-purple-200 transition">Add Products</Link>
                    <Link href="/loginform" className="block text-white hover:text-purple-200 transition">Login Form</Link>
                    <Link href="/profileform" className="block text-white hover:text-purple-200 transition">Profile Form</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;