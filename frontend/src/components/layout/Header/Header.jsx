import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import logo_name from "../../../assets/text_outfit_com.png";
import SearchInput from "../../form/SearchInput";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { SlBag } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import Navbar from "./Navbar";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  // in this function we want to logout then we have to clear the local storage and then we navigate to login page
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  console.log(cart.length);

  return (
    <>
      <header className="flex justify-between items-center h-[70px] top-0 z-50 fixed bg-[#0a0e11] w-full">
        {/* logo and app name header here */}
        <Link to="/" className="flex items-center gap-4 pl-7">
          <div className="flex items-center ">
            <div className=" md:py-0 w-28">
              <img src="/src/assets/text_outfit_com.png" alt="logo-png" />
            </div>
          </div>
        </Link>
        <Navbar />
        <SearchInput />

        <div className="min-w-max">
          <ul className="flex items-center text-white mr-8">
            {/* if not user then show register and login page ------------------------------------------  */}
            {!auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="flex md:inline-flex p-2 items-center "
                  >
                    <span>Register</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/login"
                    className="flex md:inline-flex p-2 items-center "
                  >
                    <span>Login</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <ul className="flex items-center gap-2">
                  <li>
                    <NavLink
                      to="/cart"
                      className="flex md:inline-flex p-2 items-center "
                    >
                      <span>
                        <FaRegHeart className=" fill-white" />
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/cart"
                      className="flex md:inline-flex p-2 items-center "
                    >
                      <span>
                        <SlBag className=" fill-white" />
                        {/* ({cart?.length}) */}
                      </span>
                    </NavLink>
                    <div className=" absolute h-4 w-4 rounded-full justify-center bottom-9 right-[147px] flex items-center text-xs">
                      <span>{cart?.length}</span>
                    </div>
                  </li>
                </ul>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle nav-link dropdown-toggle flex md:inline-flex p-4 items-center "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    Hi {auth?.user?.name}
                  </NavLink>

                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </header>
    </>
  );
};

export default Header;
