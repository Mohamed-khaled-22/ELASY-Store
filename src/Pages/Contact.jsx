import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setForm({ name: "", email: "", message: "" });
        toast.success("Your message has been sent!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6 py-16"
        >
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Contact Us
            </h1>
            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Got a question about our store or products? We’d love to hear from you.
                Fill out the form or use the info below to get in touch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-2xl p-6 space-y-6"
                >
                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            name="name"
                            onChange={handleChange}
                            value={form.name}
                            type="text"
                            placeholder="Enter your name"
                            required
                            className="text-base w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="text-base w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            name="message"
                            onChange={handleChange}
                            value={form.message}
                            rows="5"
                            placeholder="Write your message..."
                            required
                            className="text-base w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-lg bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col justify-center space-y-6"
                >
                    <div className="flex items-center space-x-4">
                        <Mail className="text-blue-600" size={28} />
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800">Email</h4>
                            <p className="text-lg text-gray-600">
                                mohamedkhaledelasy2@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Phone className="text-blue-600" size={28} />
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800">Phone</h4>
                            <p className="text-lg text-gray-600">+20 1030494237</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <MapPin className="text-blue-600" size={28} />
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800">Address</h4>
                            <p className="text-lg text-gray-600">Cairo, Egypt</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Contact;
