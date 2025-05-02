import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      });

      if (res.status === 201 || res.status === 200) {
        alert("verify otp");
        navigate("/otp", { state: { email: userInfo.email } });
      }
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          AI Resume Builder
        </h1>
        <p className="text-gray-500 text-center mb-4">Create Your Account</p>

        <div>
          <form onSubmit={submitHandler}>
            <label className="block text-gray-700 mb-1 font-semibold">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your username..."
              name="username"
              autoComplete="username"
              value={userInfo.username}
              onChange={onchangeHandler}
            />

            <label className="block text-gray-700 mb-1 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email address..."
              value={userInfo.email}
              name="email"
              onChange={onchangeHandler}
            />

            <label className="block text-gray-700 mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your password..."
              value={userInfo.password}
              name="password"
              autoComplete="current-password"
              onChange={onchangeHandler}
            />

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition-all duration-300"
            >
              {isLoading ? "please wait..." : "continue"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
