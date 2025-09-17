import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Truck, ShieldCheck, Headphones, Star } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CardOfProduct from "../Componants/CardOfProduct";
import { fetchProducts } from "../Features/Products/ProductsSlice";

function Home() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [visibleCount, setVisibleCount] = useState(10);

  // Memoize best sellers to avoid recalculating on each render
  const bestSellers = useMemo(() => products.filter((p) => p.bestSeller), [products]);

  // Fetch products once
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Features section
  const features = [
    { icon: <Truck className="mx-auto mb-4 text-blue-600" size={40} />, title: "Fast Shipping", desc: "Quick and reliable delivery to your doorstep." },
    { icon: <ShieldCheck className="mx-auto mb-4 text-green-600" size={40} />, title: "100% Genuine", desc: "We guarantee authentic products only." },
    { icon: <Headphones className="mx-auto mb-4 text-purple-600" size={40} />, title: "24/7 Support", desc: "Our team is always ready to help you out." },
    { icon: <Star className="mx-auto mb-4 text-yellow-500" size={40} />, title: "Top Rated", desc: "Loved by thousands of satisfied customers." },
  ];

  // Categories section
  const categories = [
    { to: "/products/PC-Cases", img: "case.jpg", label: "PC Case" },
    { to: "/products/GraphicsCards", img: "gpu.jpg", label: "Graphics Cards" },
    { to: "/products/Monitors", img: "screen.jpg", label: "Monitors" },
    { to: "/products/Processors", img: "cpu.jpg", label: "CPUs" },
    { to: "/products/Motherboards", img: "motherboard.jpg", label: "Motherboards" },
    { to: "/products/Power-Supplies", img: "power.jpg", label: "Power Supply" },
    { to: "/products/RAM", img: "ram.jpg", label: "RAMs" },
    { to: "/products/Storage", img: "storage.jpg", label: "Data Storage" },
    { to: "/products/Cooling", img: "cooler.jpg", label: "Fans & Cooling" },
    { to: "/products/Headsets", img: "headPhone.jpg", label: "Gaming Headsets" },
    { to: "/products/Mic", img: "mic.jpg", label: "Microphone" },
    { to: "/products/Keyboards", img: "keyboard.jpg", label: "Keyboard" },
    { to: "/products/Controller", img: "controller.jpg", label: "Controller & Joystick" },
    { to: "/products/Mouse", img: "mouse.jpg", label: "Mouse" },
    { to: "/products/Cables&Adapters", img: "cable.jpg", label: "Cables & Accessories" },
  ];

  // Loading state
  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-lg">Loading awesome products...</p>
      </div>
    );

  // Error state
  if (status === "failed")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="Home-page container mx-auto pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-2 px-2 z-0"
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,

          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          speed={800}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="shadow-lg w-full rounded-xl overflow-hidden"
        >
          {[
            { img: "/Image/Swiper/1.jpg", title: "Welcome to ELASY Store", desc: "Your #1 destination for high-performance PC components and accessories.", btn: "Shop Now" },
            { img: "/Image/Swiper/2.jpg", title: "Powerful GPUs", desc: "Upgrade your gaming experience with the latest NVIDIA and AMD graphics cards.", btn: "Browse GPUs" },
            { img: "/Image/Swiper/3.jpg", title: "Latest Processors", desc: "Discover Intel & AMD CPUs designed for speed, performance, and efficiency.", btn: "Explore CPUs" },
            { img: "/Image/Swiper/4.jpg", title: "Complete Your Setup", desc: "From RAM to SSDs, find everything you need to build your dream PC at ELASY.", btn: "View All Parts" },
          ].map((slide, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-[250px] sm:h-[350px] md:h-[88vh] w-full"
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4 rounded-2xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{slide.title}</h2>
                  <p className="mt-2 text-xs sm:text-base md:text-lg w-[70%] md:w-full max-w-xl text-gray-300">{slide.desc}</p>
                  <a href="#category" className="mt-4 px-6 py-2 text-sm sm:text-base md:text-lg bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-medium">
                    {slide.btn}
                  </a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* FEATURES SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white py-16 px-6"
      >
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">Why Shop With Us?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-100 p-6 rounded-xl text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-lg text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CATEGORY SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="category"
        className="mx-auto mb-8 px-4"
      >
        <h2 className="text-2xl my-12 sm:text-xl sm:my-16 font-bold text-center uppercase">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-5">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <Link to={cat.to}>
                <div className="w-full relative group cursor-pointer p-2">
                  <div className="image rounded-[45px] overflow-hidden transition duration-300 hover:-translate-y-2">
                    <img
                      className="w-full hover:scale-110 transition-all duration-300"
                      src={`/Image/Products/Category/${cat.img}`}
                      alt={cat.label}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-center font-medium text-[14px] md:text-lg capitalize my-3">{cat.label}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BEST SELLER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl my-12 sm:text-xl sm:my-16 font-bold text-center uppercase">Best Seller Products</h2>
        <div className="container best-seller grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-9 px-4">
          {bestSellers.slice(0, visibleCount).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <CardOfProduct product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SHOW MORE BUTTON */}
      {visibleCount < bestSellers.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="px-6 py-2 bg-blue-600 text-lg text-white rounded-full hover:bg-blue-700 transition"
            aria-label="Load more products"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;