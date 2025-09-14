"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-purple-900 text-white py-10 px-4 mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">MyBrand</h2>
                    <p className="text-purple-200 text-sm">
                        Building the future with quality products and a commitment to excellence.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-purple-300 transition">Home</Link></li>
                        <li><Link href="/products" className="hover:text-purple-300 transition">Products</Link></li>
                        <li><Link href="/signup" className="hover:text-purple-300 transition">Signup</Link></li>
                        <li><Link href="/login" className="hover:text-purple-300 transition">Login</Link></li>
                        <li><Link href="/purchasehistory" className="hover:text-purple-300 transition">Purchase History</Link></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-purple-200">Email: support@mybrand.com</p>
                    <p className="text-sm text-purple-200 mb-4">Phone: +1 (555) 123-4567</p>

                    <div className="flex space-x-4 mt-2">
                        {/* Replace with icons if using icon libraries like lucide or react-icons */}
                        <a href="#" className="hover:text-purple-300 transition text-sm">Facebook</a>
                        <a href="#" className="hover:text-purple-300 transition text-sm">Twitter</a>
                        <a href="#" className="hover:text-purple-300 transition text-sm">Instagram</a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-purple-700 mt-10 pt-4 text-center text-sm text-purple-300">
                &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
