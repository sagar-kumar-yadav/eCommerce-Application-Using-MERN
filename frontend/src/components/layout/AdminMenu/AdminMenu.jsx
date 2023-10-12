import React from "react";
import { NavLink } from "react-router-dom";
import "./adminMenu.css";

const AdminMenu = () => {
  return (
    <>
      <div className=" h-[96vh] mt-8 pt-10 sidebar">
        {/* <div className="sidebar-header"></div> */}
        <ul className="sidebar-list " >
          <li className="sidebar-list-item ">
            <NavLink
              to="/dashboard/admin/create-category"
              className="sidebar_link "
            >
              Create Category
            </NavLink>
          </li>
          <li className="sidebar-list-item active">
            <NavLink
              to="/dashboard/admin/create-product"
              className="sidebar_link"
            >
              Create Product
            </NavLink>
          </li>
          <li className="sidebar-list-item ">
            <NavLink to="/dashboard/admin/products" className="sidebar_link">
              Products
            </NavLink>
          </li>
          <li className="sidebar-list-item ">
            <NavLink to="/dashboard/admin/users" className="sidebar_link">
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
