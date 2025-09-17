import React from "react";
import { Truck, ShieldCheck, Headphones, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
    {
        icon: Truck,
        title: "Fast Shipping",
        desc: "Quick and reliable delivery to your doorstep.",
        color: "text-blue-600",
    },
    {
        icon: ShieldCheck,
        title: "100% Genuine",
        desc: "We guarantee authentic products only.",
        color: "text-green-600",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        desc: "Our team is always ready to help you out.",
        color: "text-purple-600",
    },
    {
        icon: Star,
        title: "Top Rated",
        desc: "Loved by thousands of satisfied customers.",
        color: "text-yellow-500",
    },
];

function About() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 text-gray-800"
        >
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-16 px-6 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    About ELASY Store
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    We are passionate about providing top-quality PC components and
                    accessories to gamers, creators, and professionals. Our goal is to
                    help you build the perfect setup with confidence.
                </p>
            </div>

            {/* About Content */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Who We Are</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        At <span className="font-semibold">ELASY Store</span>, we bring you
                        the latest and most reliable PC hardware, accessories, and
                        peripherals. Whether you are a hardcore gamer, a content creator, or
                        a business professional, we provide you with the tools to power up
                        your performance.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our team is dedicated to offering a seamless shopping experience,
                        combining trusted products, secure payment options, and fast
                        delivery.
                    </p>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                >
                    <img
                        src="https://images.unsplash.com/photo-1736457833722-35cf6dd38deb?w=500&auto=format&fit=crop&q=60"
                        alt="Modern gaming PC setup with accessories"
                        className="rounded-2xl shadow-lg w-full max-w-md object-cover"
                    />
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16 px-6">
                <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">
                    Why Shop With Us?
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(({ icon: Icon, title, desc, color }, idx) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-gray-100 p-6 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition"
                        >
                            <Icon className={`mx-auto mb-4 ${color}`} size={40} />
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-lg text-gray-600">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-900 text-white py-16 text-center px-2">
                <h2 className="text-2xl font-bold mb-4">
                    Ready to Upgrade Your Setup?
                </h2>
                <p className="text-lg text-gray-400 mb-6">
                    Explore our wide range of products and find the perfect match for your
                    needs.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
                >
                    Start Shopping
                </Link>
            </div>
        </motion.div>
    );
}

export default About;
