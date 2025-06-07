import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onchageHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!userInfo.email || !userInfo.password) {
        alert("all fileds are required");
        return;
      }
      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("logged in successfull");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        window.location.href = "/";
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-2">AI Resume Builder</h1>
        <p className="text-gray-600 mb-4">
          Welcome back! Please sign in to continue
        </p>

        <div className="flex justify-center gap-8 space-x-4 mb-4">
          <div className="flex justify-center items-center gap-1 border p-3 rounded cursor-pointer">
            {/* <img
              src={facebbok}
              alt="Facebook"
              className="w-5 h-5 cursor-pointer"
            /> */}
            <p className="text-sm">facebook</p>
          </div>
          <div className="flex justify-center items-center gap-1 border p-3 rounded cursor-pointer">
            {/* <img src={google} alt="Google" className="w-5 h-5 cursor-pointer" /> */}
            <p className="text-sm">google</p>
          </div>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <p className="mx-2 text-gray-500">or</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-left">
          <form action="" onSubmit={submitHandler}>
            <label className="block text-gray-700 mb-1 font-bold">
              Email address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter your email address.."
              name="email"
              value={userInfo.email}
              onChange={onchageHandler}
            />
            <label className="block text-gray-700 mb-1 font-bold">
              Password
            </label>
            <div>
              <input
                type={showPassword ? "password" : "text"}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Enter your password.."
                name="password"
                autoComplete="current-password"
                value={userInfo.password}
                onChange={onchageHandler}
              />
              <button
                className="absolute top-[61%] md:right-[40%] right-28  text-gray-600"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash size={25} />
                ) : (
                  <BsEyeFill size={25} />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
            >
              {isLoading ? "please wait..." : "Continue"}
            </button>
            <p
              className="my-1 text-center text-gray-500 text-sm hover:text-gray-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgetpassword")}
            >
              {" "}
              forget password ?
            </p>
          </form>
        </div>

        <p className="mt-2 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
