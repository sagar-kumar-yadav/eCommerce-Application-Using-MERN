import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className=" w-[100%] height-[100%] flex overflow-hidden m-auto gap-[19rem]">
        <AdminMenu />

        <div className="flex flex-col justify-center items-center gap-2">
          All User
        </div>
      </div>
    </Layout>
  );
};

export default Users;
