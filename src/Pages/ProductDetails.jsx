// React & Hooks
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, incrementItem, decrementItem } from "../Features/Cart/CartSlice";
import { fetchProducts } from "../Features/Products/ProductsSlice";

// UI Libraries
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Star, User } from "lucide-react";

// Components
import CardOfProduct from "../Componants/CardOfProduct";

function ProductDetails() {
    // Redux
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    // Params
    const productTargetId = Number(useParams().productId);
    const product = products.find((item) => item.id === productTargetId);

    // Local states
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // LocalStorage (cart items)
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Fetch products when component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Sync "isAdded" state with cart items
    useEffect(() => {
        if (product && storedItems.some((item) => item.id === product.id)) {
            setIsAdded(true);
            setQuantity(storedItems.find((item) => item.id === product.id).quantity);
        } else {
            setIsAdded(false);
            setQuantity(1);
        }
    }, [product]);

    // Find related products
    const related = products.filter((item) => item.category === product?.category);

    // Handle loading & error states
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Product details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden"
            >
                {/* Product image */}
                <div className="flex justify-center items-center p-4">
                    <img
                        src={`/Image/Products/${product.image}`}
                        alt={product.name}
                        className="mix-blend-multiply md:h-1/2 object-contain transition-transform duration-500 hover:scale-[1.1]"
                    />
                </div>

                {/* Product info */}
                <div className="flex flex-col gap-4 p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">Rating: {product.rating}</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    fill={i < product.rating ? "greenyellow" : "rgb(230 235 244)"}
                                    color={i < product.rating ? "greenyellow" : "rgb(230 235 244)"}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600">{product.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
                        <span className="px-3 py-1 bg-gray-100 rounded-full">ID: {product.id}</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full">Category: {product.category}</span>
                    </div>

                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-green-600">${product.price}</p>
                    </div>

                    {/* Stock info */}
                    <div className="flex items-center gap-6 mt-4 text-sm">
                        <span className="text-gray-700">Stock: {product.stock}</span>
                        <span className="text-gray-700">Sold: {product.sold}</span>
                    </div>

                    {/* Cart buttons */}
                    {isAdded ? (
                        <div className="flex flex-col items-center justify-center gap-3 mt-4">
                            {/* Remove button */}
                            <button
                                onClick={() => {
                                    toast.success("Product removed from cart successfully!");
                                    setQuantity(1);
                                    setIsAdded(false);
                                    dispatch(deleteItem(product));
                                }}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                            >
                                Remove
                            </button>

                            {/* Quantity control */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setQuantity((pre) => (pre > 1 ? pre - 1 : 1));
                                        product.quantity > 1 && dispatch(decrementItem(product));
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm"
                                >
                                    -
                                </button>
                                <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-md font-medium text-sm">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => {
                                        setQuantity((pre) => pre + 1);
                                        dispatch(incrementItem(product));
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                toast.success("Product added to cart successfully!");
                                setIsAdded(true);
                                dispatch(addItem(product));
                            }}
                            className={`w-full py-2 px-4 rounded-lg font-semibold text-base transition-colors duration-300 ${product.stock > 0
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                }`}
                            disabled={product.stock <= 0}
                        >
                            {product.stock > 0 ? "Add to Cart" : "Not available now"}
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Reviews & Related products */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5 }}
            >
                {/* Reviews */}
                <h2 className="text-2xl font-bold text-gray-800 my-10">Top reviews</h2>
                <div className="container flex flex-col gap-9 p-4">
                    {product.comments.map((comment, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.05 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="cursor-pointer hover:shadow-lg hover:-translate-y-2 transition duration-300 border p-4 rounded-lg shadow-sm bg-white"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-lg md:text-xl flex gap-3 items-center font-bold text-gray-800">
                                    <User
                                        size={36}
                                        className="transition user-btn bg-gray-200 p-2 text-black rounded-full"
                                    />
                                    <h3>{comment.user}</h3>
                                </div>
                                <p className="text-sm text-gray-500">{comment.date}</p>
                            </div>

                            {/* Review stars */}
                            <div className="flex py-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        fill={i < comment.rating ? "greenyellow" : "rgb(230 235 244)"}
                                        color={i < comment.rating ? "greenyellow" : "rgb(230 235 244)"}
                                    />
                                ))}
                            </div>

                            <p className="text-base text-gray-700">{comment.comment}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Related products */}
                <h2 className="text-2xl font-bold text-gray-800 my-10">Related Products</h2>
                <div className="container best-seller grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-9 p-4">
                    {related
                        .filter((item) => item.id !== product.id)
                        .map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.05 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            >
                                <CardOfProduct product={item} />
                            </motion.div>
                        ))}
                </div>
            </motion.div>
        </div>
    );
}

export default ProductDetails;
