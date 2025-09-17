import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { changeUserData } from "../Features/User/UserSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.user);

  const [showPass, setShowPass] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || { name: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(changeUserData(formData));
    setIsEditing(false);
    toast.success("User data has been saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(changeUserData(null));
    toast.success("You have been logged out!");
    navigate("/login");
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const SignInFallback = () => (
    <motion.div>
      <h2 className="text-2xl font-semibold mb-4">No user data yet</h2>
      <button
        onClick={() => navigate("/login")}
        className="text-lg bg-blue-600 text-white my-2 px-6 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Sign In
      </button>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
      {/* Sidebar */}
      <aside className="bg-white rounded-xl shadow-md p-4 md:col-span-1 h-fit">
        <h2 className="text-xl font-bold mb-4">My Account</h2>
        <nav className="space-y-2">
          {["profile", "orders", "logout"].map((tab) => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor:
                  activeTab === tab
                    ? "rgb(37, 99, 235)"
                    : tab === "logout"
                      ? "transparent"
                      : "#fff",
                color:
                  activeTab === tab
                    ? "#fff"
                    : tab === "logout"
                      ? "rgb(220, 38, 38)"
                      : "#000",
                boxShadow:
                  activeTab === tab
                    ? "0 4px 6px rgba(0,0,0,0.2)"
                    : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.3 }}
              className="text-lg w-full text-left px-3 py-2 rounded-lg"
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile" && "Profile"}
              {tab === "orders" && "Orders"}
              {tab === "logout" && "Logout"}
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="bg-white rounded-xl shadow-md p-6 md:col-span-3 min-h-[250px]">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {user && user.name ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
                  {!isEditing ? (
                    <div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-600 text-sm">Full Name</p>
                          <p className="text-lg">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Email Address</p>
                          <p className="text-lg">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Password</p>
                          <p className="text-lg">{"*".repeat(user.password.length)}</p>
                        </div>
                      </div>
                      <button
                        className="text-lg mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="text-lg w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="text-lg w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-gray-600 text-sm mb-1">Password</label>
                        <input
                          type={showPass ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="text-lg w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <button
                          className="text-lg px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="text-lg px-5 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <SignInFallback />
              )}
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {user && user.name ? (
                <>
                  <h2 className="text-2xl font-semibold">My Orders</h2>
                  <p className="py-4 text-lg text-gray-600">You have no orders yet.</p>
                  <button
                    onClick={() => navigate("/products")}
                    className="text-lg mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Start Shopping
                  </button>
                </>
              ) : (
                <SignInFallback />
              )}
            </motion.div>
          )}

          {activeTab === "logout" && (
            <motion.div>
              {user && user.name ? (
                <>
                  <h2 className="text-2xl font-semibold text-red-600 mb-4">
                    Are you sure you want to logout?
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="text-lg px-5 my-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <SignInFallback />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
