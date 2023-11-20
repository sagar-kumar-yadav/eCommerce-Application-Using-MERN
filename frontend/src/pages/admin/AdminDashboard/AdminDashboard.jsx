import React from "react";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../../../components/layout/AdminMenu/AdminMenu";
import { useAuth } from "../../../context/auth";
// import './adminDashboard.css'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className=" w-[100%] height-[100%] flex overflow-hidden m-auto gap-[19rem]">
        <AdminMenu />

        <div className="flex flex-col justify-center items-center gap-2">
          <h3>Admin Name: {auth?.user?.name}</h3>
          <h3>Admin Phone: {auth?.user?.phone}</h3>
          <h3>Admin email: {auth?.user?.email}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
