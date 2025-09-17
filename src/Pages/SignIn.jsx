import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserData } from "../Features/User/UserSlice";

export default function SignIn() {
    const [page, setPage] = useState("signIn"); // signIn | signUp
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
    const [wrongMsg, setWrongMsg] = useState({ show: false, type: "", msg: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSignIn() {
        if (signInData.email !== "" && signInData.password !== "") {
            const userData = JSON.parse(localStorage.getItem("user"));

            if (userData && signInData.email === userData.email && signInData.password === userData.password) {
                dispatch(changeUserData(userData));
                navigate("/");
            } else {
                setWrongMsg({ show: true, type: "signInMs", msg: "Please enter a valid email or password" });
            }
        }
    }

    function handleSignUp() {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email)) {
            setWrongMsg({ show: true, type: "signUpEmail", msg: "Please enter a valid email" });
        } else {
            const newUser = {
                name: signUpData.name,
                email: signUpData.email,
                password: signUpData.password,
            };

            localStorage.setItem("user", JSON.stringify(newUser));
            dispatch(changeUserData(newUser));

            setWrongMsg({ show: false, type: "", msg: "" });
            setPage("signIn");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <AnimatePresence mode="wait">
                {page === "signIn" && (
                    <motion.div
                        key="signIn"
                        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            Welcome Back 👋
                        </motion.h2>

                        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-4">
                            <div>
                                <label className="text-lg block text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="text-sm w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    value={signInData.email}
                                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-lg block text-gray-600 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="text-sm w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    value={signInData.password}
                                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                                />
                            </div>
                            {wrongMsg.show && wrongMsg.type === "signInMs" && (
                                <p className="text-sm text-red-900">{wrongMsg.msg}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full text-lg mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                Don’t have an account?{" "}
                                <button onClick={() => setPage("signUp")} className="text-blue-600 hover:underline">
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </motion.div>
                )}

                {page === "signUp" && (
                    <motion.div
                        key="signUp"
                        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            Create Account ✨
                        </motion.h2>

                        <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className="space-y-4">
                            <div>
                                <label className="text-lg block text-gray-600 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="text-sm w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    value={signUpData.name}
                                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-lg block text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="text-sm w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    value={signUpData.email}
                                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                />
                            </div>
                            {wrongMsg.show && wrongMsg.type === "signUpEmail" && (
                                <p className="text-sm text-red-900">{wrongMsg.msg}</p>
                            )}
                            <div>
                                <label className="text-lg block text-gray-600 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="text-sm w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    value={signUpData.password}
                                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-lg mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                Already have an account?{" "}
                                <button onClick={() => setPage("signIn")} className="text-blue-600 hover:underline">
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
