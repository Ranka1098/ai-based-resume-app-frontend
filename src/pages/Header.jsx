import React from "react";
import LOGO from "../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    alert("Logout successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-2 shadow-md bg-white sticky top-0 z-50 ">
      <div className=" ">
        <Link to={"/"}>
          <img src={LOGO} alt="" width={65} />
        </Link>
      </div>
      <p className="font-sans font-bold text-2xl">
        AI BASED RESUME BUILDER APP
      </p>

      <div className="flex justify-between">
        <button
          onClick={logout}
          className="bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-800 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
