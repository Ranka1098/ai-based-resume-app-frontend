import React, { useEffect, useState } from "react";
import axios from "axios";

const Timer = ({ email }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    const oneMinuteTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(oneMinuteTimer);
  }, [timer]);

  const handleResend = async () => {
    alert("resent OTP");
    setTimer(60);
    const res = await axios.post("http://localhost:8080/api/auth/resendOtp", {
      email: email,
    });

    if (res.status === 200) {
      alert("opt resend successfully");
    }
  };
  return (
    <div className="text-center py-5 font-bold text-xl">
      {timer > 0 ? (
        <p className="text-gray-700 font-semibold">{timer} seconds remaining</p>
      ) : (
        <button
          onClick={handleResend}
          className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default Timer;
