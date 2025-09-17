import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, decrementItem, incrementItem, clearCart } from "../Features/Cart/CartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.userData.user);

  // ✅ Memoized total calculation
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
    [items]
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Title */}
      <motion.h1
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Shopping Cart
      </motion.h1>

      {/* Empty cart */}
      {items.length === 0 ? (
        <motion.p
          className="text-gray-500 text-sm sm:text-base md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Product image */}
                <img
                  loading='lazy'
                  src={`/Image/Products/${product.image}`}
                  alt={product.name}
                  className="h-28 w-28 sm:h-24 sm:w-24 object-contain mx-auto sm:mx-0"
                />

                {/* Product info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{product.category}</p>
                  <p className="text-green-600 font-bold text-sm sm:text-base">${product.price}</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center justify-center gap-3">
                  {/* Remove button */}
                  <button
                    onClick={() => {
                      toast.success(`Removed ${product.name} from cart!`);
                      dispatch(deleteItem(product));
                    }}
                    aria-label="Remove item from cart"
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                  >
                    Remove
                  </button>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => product.quantity > 1 && dispatch(decrementItem(product))}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-md font-medium text-sm">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => {
                        toast.success(`Increased ${product.name} quantity!`);
                        dispatch(incrementItem(product));
                      }}
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="border rounded-xl p-4 sm:p-6 shadow-md bg-white h-fit"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Items:</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between mb-4 font-bold text-sm sm:text-base">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            {/* Checkout */}
            <button
              disabled={items.length === 0}
              onClick={() => (user ? navigate("/checkOut") : navigate("/login"))}
              className="w-full px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>

            {/* Clear cart */}
            <button
              onClick={() => {
                toast.error("Cart cleared!");
                dispatch(clearCart());
              }}
              className="w-full px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
            >
              Clear Cart
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
