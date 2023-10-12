import React from "react";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../../../components/layout/AdminMenu/AdminMenu";
import { useAuth } from "../../../context/auth";
// import './adminDashboard.css'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      {/* <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card  p-3">
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Phone: {auth?.user?.phone}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div> */}

      <div className=" h-[96vh] mt-8 pt-10 sidebar">
        <AdminMenu/>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
