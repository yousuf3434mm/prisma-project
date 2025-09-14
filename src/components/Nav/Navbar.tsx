"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; // to highlight active links
import Container from "../Container/Container";

const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/signup", label: "Signup Form" },
    { href: "/products/addproducts", label: "Add Products" },
    { href: "/login", label: "Login" },
    { href: "/products/mobilenumber", label: "Mobile No:" },
    { href: "/purchasehistory", label: "Purchase History" },
];

const mobileLinks = [
    { href: "/products", label: "Products" },
    { href: "/signup", label: "Signup Form" },
    { href: "/products/addproducts", label: "Add Products" },
    { href: "/login", label: "Login" },
    { href: "/profileform", label: "Profile Form" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Container>
            <nav className="bg-purple-800 backdrop-blur text-white shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold tracking-wide hover:text-purple-200 transition">MyBrand</span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-purple-300 transition duration-200 ${
                                    pathname === link.href ? "text-purple-300 underline underline-offset-4" : ""
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-purple-300 transition"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-screen py-4 px-4" : "max-h-0"
                } bg-purple-700`}
            >
                <div className="flex flex-col space-y-3">
                    {mobileLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block text-white hover:text-purple-300 transition duration-200 ${
                                pathname === link.href ? "text-purple-300 underline underline-offset-4" : ""
                            }`}
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
        </Container>
    );
};

export default Navbar;
