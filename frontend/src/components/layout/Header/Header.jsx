import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
// import { HiShoppingBag } from "react-icons/hi";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import cart_icon from "../../../assets/cart_icon.png";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  return (
    <>
      <nav className="flex px-4 border-b md:shadow-lg items-center w-[100%] top-0 z-50 fixed bg-white">
        <div className="text-lg font-bold md:py-0 py-4 w-12 ml-4">
          <img src={logo} alt="logo-png" />
        </div>
        <Link to="/">
          <span className="px-4 font-bold text-lg text-[#333]">E-commerce</span>
        </Link>

        <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
          <li>
            <NavLink
              to="/"
              className="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>Category</span>
            </NavLink>
          </li>

          {!auth.user ? (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="flex md:inline-flex p-4 items-center hover:bg-gray-50"
                >
                  <span>Register</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className="flex md:inline-flex p-4 items-center hover:bg-gray-50"
                >
                  <span>Login</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="relative parent">
                <NavLink
                  className="dropdown flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 space-x-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{auth?.user?.name}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-current pt-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                  </svg>
                </NavLink>
                {isDropdownOpen && (
                  <ul
                    className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="flex px-4 py-3 hover:bg-gray-50"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="flex px-4 py-3 hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}

          <li>
            <NavLink className="flex md:inline-flex p-4 items-center hover:bg-gray-50">
              <span>cart(0)</span>
            </NavLink>
          </li>
        </ul>
        <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </nav>
    </>
  );
};

export default Header;
