import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppIcon = ({ size = 22, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="currentColor"
        className={className}
    >
        <path d="M16 .4C7.5.4.4 7.5.4 16c0 2.8.7 5.4 2 7.8L0 32l8.5-2.2c2.3 1.3 5 2 7.8 2 8.5 0 15.6-7.1 15.6-15.6S24.5.4 16 .4zm0 28.7c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 .9 1-4.9-.3-.5c-1.2-2-1.9-4.3-1.9-6.7 0-7.1 5.8-12.9 12.9-12.9S28.9 8.9 28.9 16 23.1 29.1 16 29.1zm7-9.4c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2s-1.1 1.2-1.3 1.5c-.2.2-.5.3-.9.1s-1.8-.7-3.4-2.2c-1.3-1.2-2.2-2.6-2.5-3-.2-.4 0-.6.2-.8s.4-.5.5-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7s-.9-2.1-1.2-2.9c-.3-.8-.7-.7-.9-.7h-.8c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.5 3.9 6.1 5.5.9.4 1.7.7 2.2.9.9.3 1.6.3 2.2.2.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8s-.4-.2-.8-.4z" />
    </svg>
);

function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 w-full">
            <motion.div 
                className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo + About */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className="text-2xl font-bold text-white">ELASY Store</h2>
                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                        We provide the latest and most powerful PC components, accessories,
                        and peripherals to build your dream setup.
                    </p>
                </motion.div>

                {/* Shop Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">All Products</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">Categories</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">New Arrivals</a></li>
                    </ul>
                </motion.div>

                {/* Customer Service */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">Returns & Refunds</a></li>
                        <li><a href="#" className="hover:text-blue-500 duration-300 hover:ml-2 transition-all text-lg">FAQs</a></li>
                    </ul>
                </motion.div>

                {/* Social Media */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { Icon: Facebook, link: "https://www.facebook.com/share/14GJkYbNSvD/" },
                            { Icon: Instagram, link: "https://www.instagram.com/mohamed_khaled_darwesh?igsh=MW9yOGIyeHZrcTRpYw==" },
                            { Icon: Github, link: "https://github.com/Mohamed-khaled-22" },
                            { Icon: Linkedin, link: "https://www.linkedin.com/in/mohamed-khaled-2435962bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                            { Icon: WhatsAppIcon, link: "https://wa.me/+201030494237" },
                        ].map(({ Icon, link }, i) => (
                            <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-11 h-11 text-green flex items-center justify-center rounded-full border-2 border-gray-500 hover:border-white hover:text-white transition-colors duration-300"
                            >
                                <Icon size={22} />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
                className="border-t border-gray-800 text-center py-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                © {new Date().getFullYear()} <span className="text-[#2563eb] font-bold">ELASY</span> Store. Made by | Mohamed Khaled.
            </motion.div>
        </footer>
    );
}

export default Footer;
