import React, { useEffect, useState } from "react";
import LOGO from "../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem("user"));

  const [showuser, setShowUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 🔁 Parse string to object
    }
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    alert("Logout successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-2 py-2 shadow-md bg-white sticky top-0 z-50 ">
      <div className=" ">
        <Link to={"/"}>
          <img src={LOGO} alt="logo" className=" w-12 md:w-[65px]" />
        </Link>
      </div>
      <p className="font-sans font-bold text-[0.7rem] md:text-2xl">
        AI BASED RESUME BUILDER APP
      </p>

      <div>
        {location.pathname === "/" && (
          <div
            onClick={() => setShowUser(!showuser)}
            className="border-2   border-black p-2 rounded-full cursor-pointer"
          >
            <p>
              <FaUser size={20} />
            </p>
          </div>
        )}
      </div>

      {showuser && user && (
        <div
          onClick={() => setShowUser(!showuser)}
          className="absolute mr-1 right-0 top-13 mt-2  bg-gray-200 shadow-md rounded-md p-1 border z-10"
        >
          <p className="text-md md:font-semibold text-center">{user?.name}</p>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{user?.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 cursor-pointer text-white flex justify-center px-4 py-2 rounded-md w-full hover:bg-red-600 transition duration-300"
          >
            <MdOutlineLogout />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
