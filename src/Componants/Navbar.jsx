import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, Menu, ShoppingCart, Search } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userData.user);
    const cartLength = useSelector((state) => state.cart.cartItems.length);
    const products = useSelector((state) => state.products.products);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);

    const menuRef = useRef(null);
    const userRef = useRef(null);
    const searchRef = useRef(null);

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest(".menu-btn")
            ) {
                setIsMenuOpen(false);
            }
            if (
                userRef.current &&
                !userRef.current.contains(event.target) &&
                !event.target.closest(".user-btn")
            ) {
                setIsUserOpen(false);
            }
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // فلترة المنتجات حسب البحث
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.header
            className="bg-white shadow-md relative"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-blue-600">
                    ELASY
                </Link>

                {/* Desktop Links */}
                <ul className="hidden sm:flex gap-6 text-lg">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path} className="relative group">
                                <span className="transition duration-300 group-hover:text-blue-600">
                                    {link.label}
                                </span>
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Search Input */}
                <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true);
                        }}
                        className="w-full px-3 py-1.5 text-sm border rounded-full outline-none transition-all duration-300 
                       focus:w-full focus:shadow-md focus:border-blue-400"
                    />
                    <Search
                        size={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    {/* Search Results */}
                    {showResults && searchTerm && filteredProducts.length > 0 && (
                        <ul className="absolute z-50 top-full mt-2 w-full bg-white shadow-md rounded-lg max-h-64 overflow-y-auto">
                            {filteredProducts.slice(0, 10).map((product) => (
                                <li
                                    key={product.id}
                                    onClick={() => {
                                        navigate(`/productDetails/${product.id}`);
                                        setSearchTerm("");
                                        setShowResults(false);
                                    }}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition"
                                >
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <Menu
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        size={36}
                        className="menu-btn sm:hidden bg-gray-200 p-2 hover:bg-blue-600 hover:text-white text-black rounded-full cursor-pointer transition"
                    />

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                        {cartLength > 0 && (
                            <span className="absolute -top-2 -right-1 h-5 w-5 flex items-center justify-center bg-red-600 text-white text-[12px] font-semibold rounded-full">
                                {cartLength}
                            </span>
                        )}
                        <ShoppingCart
                            size={36}
                            className="bg-gray-200 p-2 text-black rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition"
                        />
                    </Link>

                    {/* User Dropdown (desktop) */}
                    <div className="relative hidden sm:block" ref={userRef}>
                        <User
                            onClick={() => setIsUserOpen((prev) => !prev)}
                            size={36}
                            className="user-btn bg-gray-200 p-2 text-black rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition"
                        />

                        <div
                            className={`z-50 absolute right-0 mt-2 w-40 top-[47px] bg-white shadow-md rounded-lg p-3 flex flex-col gap-2 text-sm transition-all duration-200 ${isUserOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                                }`}
                        >
                            {!user ? (
                                <Link
                                    className="transition duration-300 hover:text-blue-600"
                                    to="/login"
                                    onClick={() => setIsUserOpen(false)}
                                >
                                    Sign In
                                </Link>
                            ) : (
                                <Link
                                    className="transition duration-300 hover:text-blue-600"
                                    to="/account"
                                    onClick={() => setIsUserOpen(false)}
                                >
                                    My Account
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`z-50 sm:hidden flex flex-col gap-4 bg-zinc-50 p-4 absolute top-[70px] left-0 w-full shadow-md transition-all duration-300 text-sm ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        className="transition duration-300 hover:text-blue-600"
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <hr />
                {!user ? (
                    <Link
                        className="transition duration-300 hover:text-blue-600"
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                ) : (
                    <Link
                        className="transition duration-300 hover:text-blue-600"
                        to="/account"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        My Account
                    </Link>
                )}
            </div>
        </motion.header>
    );
}

export default Navbar;
