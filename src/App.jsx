import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ChevronsUp } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeUserData } from "./Features/User/UserSlice";

// Pages
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import MyAccount from "./Pages/MyAccount";
import SignIn from "./Pages/SignIn";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Checkout from "./Pages/CheckOut";
import Error404 from "./Pages/Error404";

// Components
import Navbar from "./Componants/Navbar";
import Footer from "./Componants/Footer";
import ScrollToTop from "./Componants/ScrollToTop";

export default function App() {
  // State to show/hide scroll to top button
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTopVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(changeUserData(user));
    }
  }, [dispatch]);

  return (
    <div id="up" className="flex flex-col min-h-screen text-base">
      {/* Toast notifications */}
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#6580c9",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "10px",
            padding: "16px",
          },
        }}
      />

      {/* Navbar with entrance animation */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      {/* Main content */}
      <main className="flex-grow">
        {/* ScrollToTop helper component */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signIn" element={<SignIn />} /> {/* Consider removing duplicate route */}
          <Route path="/products/:category" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/checkOut" element={<Checkout />} />
          <Route path="/notFound" element={<Error404 />} />
        </Routes>
      </main>

      {/* Footer with entrance animation */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>

      {/* Scroll To Top Button */}
      <a
        className={`fixed bottom-6 right-6 p-2 bg-blue-500 text-white rounded-full transition`}
        style={{ display: scrollToTopVisible ? "block" : "none" }}
        href="#up"
      >
        <ChevronsUp />
      </a>
    </div>
  );
}
