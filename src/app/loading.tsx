"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ElegantLoading() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
            {/* Glassmorphic Card */}
            <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl flex flex-col items-center">

                {/* Animated Loader Circle */}
                <motion.div
                    className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />

                {/* Loading Text */}
                <motion.h1
                    className="text-2xl font-semibold mt-6 tracking-wide"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Loading{dots}
                </motion.h1>

                {/* Shimmer Progress Bar */}
                <div className="relative mt-6 w-56 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-white/40 to-white/80"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Subtle Caption */}
                <motion.p
                    className="mt-4 text-sm text-white/80 italic"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                >
                    Preparing something amazing for you...
                </motion.p>
            </div>
        </div>
    );
}
