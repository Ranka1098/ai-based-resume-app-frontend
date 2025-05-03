import React from "react";
import LOGO from "../images/LOGO.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-2 shadow-md bg-white">
      <div className=" ">
        <img src={LOGO} alt="" width={65} />
      </div>

      <div className="flex justify-between">
        <Link to={"/login"}>
          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-800 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
