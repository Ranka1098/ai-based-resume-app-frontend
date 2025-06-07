import { useLocation, useNavigate } from "react-router-dom";
import Timer from "./Timer";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Otp = () => {
  const [otpfiled, setOptfiled] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);

  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value.trim())) {
      return;
    }

    const copyOtp = [...otpfiled];
    copyOtp[index] = value.slice(-1);
    setOptfiled(copyOtp);
    if (value && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleKeydown = (e, index) => {
    const key = e.key;
    if (key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (key === "ArrowRight" && index < otpfiled.length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (key === "Backspace") {
      const copyOtp = [...otpfiled];
      // If current input is empty, go to previous field
      if (copyOtp[index] === "") {
        if (index > 0) {
          inputRef.current[index - 1]?.focus();
        }
      } else {
        copyOtp[index] = "";
        setOptfiled(copyOtp);
      }
    }
  };

  const handleverifyOtp = async () => {
    try {
      const otp = otpfiled.join("");
      console.log(otp);
      const res = await axios.post(
        "https://ai-based-resume-app-backend.onrender.com/api/auth/verifyOtp",
        {
          email: email,
          otp: otp,
        }
      );

      if (res.status === 200) {
        alert("otp sucessfully verify");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>

        <div className="flex justify-between gap-3">
          {otpfiled.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              ref={(currentInput) => {
                inputRef.current[index] = currentInput;
              }}
              onKeyDown={(e) => handleKeydown(e, index)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          ))}
        </div>
        {<Timer email={email} />}
        <p className="text-center text-gray-600 mt-4">
          Enter the 6-digit OTP sent to your email.
        </p>

        <button
          onClick={handleverifyOtp}
          className="w-full mt-6 bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition-all duration-300"
        >
          Verify OTP
        </button>

        <p className="text-center text-sm text-gray-500 mt-3 ">
          not Logged in ?
          <span
            className="text-purple-700 ml-1 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default Otp;
