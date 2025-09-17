import { Wrench, Truck, RefreshCw, Headphones, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
    const services = [
        {
            id: 1,
            icon: <Wrench size={40} className="text-blue-600 mx-auto mb-4" />,
            title: "Custom PC Building",
            desc: "We help you build the perfect PC tailored to your needs, whether for gaming, work, or content creation.",
        },
        {
            id: 2,
            icon: <Truck size={40} className="text-green-600 mx-auto mb-4" />,
            title: "Fast & Secure Delivery",
            desc: "Get your products delivered quickly and safely to your doorstep.",
        },
        {
            id: 3,
            icon: <RefreshCw size={40} className="text-purple-600 mx-auto mb-4" />,
            title: "Easy Returns",
            desc: "Not satisfied? We provide hassle-free returns and exchanges.",
        },
        {
            id: 4,
            icon: <Headphones size={40} className="text-orange-600 mx-auto mb-4" />,
            title: "Technical Support",
            desc: "Our experts are available 24/7 to answer your questions and solve issues.",
        },
        {
            id: 5,
            icon: <ShieldCheck size={40} className="text-yellow-500 mx-auto mb-4" />,
            title: "Warranty & Guarantee",
            desc: "All products come with full warranty and quality assurance.",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6 py-16"
        >
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
                Our Services
            </h1>
            <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">
                At <span className="font-semibold text-blue-600">ELASY Store</span>, we
                don’t just sell products, we provide full solutions to make your
                experience smooth, fast, and reliable.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="transition duration-300 cursor-pointer bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl relative"
                    >
                        {service.icon}
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-lg text-gray-600">{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
