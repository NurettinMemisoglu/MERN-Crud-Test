import React from "react";
import {
  LuPlusSquare,
  LuShoppingCart,
  LuMoon,
  LuSun,
  LuLogOut,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="container mx-auto px-10 py-4">
      {" "}
      {/* Use <nav> for semantic HTML */}
      <div className="flex flex-col sm:flex-row items-center justify-between h-20">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 uppercase flex items-center"
          >
            Product Store
            <LuShoppingCart color="white" size={24} />
          </Link>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Link to="/create">
            <svg
              className="swap-off h-10 w-15 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 20"
            >
              <LuPlusSquare />
            </svg>
          </Link>
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="light" />
            <svg
              className="swap-on h-10 w-10 fill-current select-ghost"
              viewBox="0 0 24 24"
            >
              <LuSun size={20} />
            </svg>
            <svg
              className="swap-off h-10 w-15 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <LuMoon size={20} />
            </svg>
          </label>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
