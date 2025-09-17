import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const [billing, setBilling] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        cardNumber: "",
        cardExp: "",
        cardCvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBilling((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const allFilled = Object.values(billing).every((f) => f.trim() !== "");
        if (!allFilled) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }
        navigate("/notFound");
    };

    const { subtotal, shipping, tax, total } = useMemo(() => {
        const subtotalCalc = cartItems.reduce(
            (s, it) => s + it.price * (it.quantity || 1),
            0
        );
        const shippingCalc = subtotalCalc > 0 ? 30 : 0;
        const taxCalc = +(subtotalCalc * 0.14).toFixed(2);
        const totalCalc = +(subtotalCalc + shippingCalc + taxCalc).toFixed(2);

        return {
            subtotal: subtotalCalc,
            shipping: shippingCalc,
            tax: taxCalc,
            total: totalCalc,
        };
    }, [cartItems]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <form className="lg:col-span-2 space-y-6" onSubmit={handlePlaceOrder}>
                    {/* Billing */}
                    <section className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-medium mb-4">Shipping & Billing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["fullName", "email", "phone", "city", "postalCode", "country"].map((field) => (
                                <input
                                    key={field}
                                    name={field}
                                    type={field === "email" ? "email" : "text"}
                                    value={billing[field]}
                                    onChange={handleChange}
                                    placeholder={field.replace(/([A-Z])/g, " $1")}
                                    required
                                    className="text-lg border rounded px-3 py-2"
                                />
                            ))}
                        </div>
                        <textarea
                            name="address"
                            value={billing.address}
                            onChange={handleChange}
                            placeholder="Full address"
                            required
                            className="text-lg border rounded px-3 py-2 w-full min-h-[100px] mt-4"
                        />
                    </section>

                    {/* Payment */}
                    <section className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-medium mb-4">Payment Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                name="cardNumber"
                                value={billing.cardNumber}
                                onChange={handleChange}
                                placeholder="Card number"
                                required
                                className="text-lg border rounded px-3 py-2 md:col-span-2"
                            />
                            <input
                                name="cardExp"
                                value={billing.cardExp}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                required
                                className="text-lg border rounded px-3 py-2"
                            />
                            <input
                                name="cardCvv"
                                value={billing.cardCvv}
                                onChange={handleChange}
                                placeholder="CVV"
                                required
                                className="text-lg border rounded px-3 py-2"
                            />
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-lg px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="text-lg px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Confirm Payment — {total} USD
                        </button>
                    </div>
                </form>

                {/* Summary */}
                <aside className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h3 className="text-xl font-medium">Order Summary</h3>
                    <div className="divide-y">
                        <div className="space-y-3 pb-3">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                cartItems.map((it) => (
                                    <div key={it.id} className="flex items-center gap-3">
                                        <img
                                            loading='lazy'
                                            src={`/Image/Products/${it.image}`}
                                            alt={it.name}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{it.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Qty: {it.quantity || 1}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-lg">
                                            {(it.price * (it.quantity || 1)).toFixed(2)} USD
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="pt-3 space-y-2 text-lg">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)} USD</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping.toFixed(2)} USD</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>{tax.toFixed(2)} USD</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>{total.toFixed(2)} USD</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
