import React from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h1>

        <form>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition-all duration-300"
          >
            Submit
          </button>
          <p
            className="text-center mt-1 text-gray-500 text-sm hover:underline"
            onClick={() => navigate("/login")}
          >
            back
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
