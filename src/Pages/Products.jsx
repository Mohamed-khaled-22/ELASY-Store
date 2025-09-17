// React & Hooks
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Features/Products/ProductsSlice";

// UI Libraries
import { motion } from "framer-motion";

// Components
import CardOfProduct from "../Componants/CardOfProduct";

function Products() {
    // Router params
    const { category } = useParams();

    // Redux
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    // State for pagination (Show More button)
    const [visibleCount, setVisibleCount] = useState(10);

    // Fetch products only once if idle
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Filtered products (memoized for performance)
    const filteredProducts = useMemo(() => {
        return products.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
        );
    }, [products, category]);

    // Loading state
    if (status === "loading") {
        return (
            <p className="flex items-center justify-center min-h-full">Loading...</p>
        );
    }

    // Error state
    if (status === "failed") {
        return (
            <p className="flex items-center justify-center h-full">
                Error: {error}
            </p>
        );
    }

    return (
        <div className="p-4 container mx-auto my-10">
            {/* Page Title */}
            <h1 className="text-xl md:text-2xl font-bold text-center my-6 py-8">
                Products page for category:{" "}
                <span className="text-blue-600">{category}</span>
            </h1>

            {/* Success state */}
            {status === "succeeded" && (
                <div>
                    {/* Products grid */}
                    <div className="container best-seller grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-9">
                        {filteredProducts.slice(0, visibleCount).map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.05 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            >
                                <CardOfProduct product={product} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More button */}
                    {visibleCount < filteredProducts.length && (
                        <div className="text-center my-6">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 10)}
                                className="text-lg bg-blue-600 text-white my-2 px-6 py-2 rounded-lg shadow hover:bg-blue-700"
                            >
                                Show More
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {filteredProducts.length === 0 && (
                        <p className="text-center text-gray-500 my-10">
                            No products found for this category.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Products;
