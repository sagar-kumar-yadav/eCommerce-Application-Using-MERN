import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  // console.log(categories);
  return (
    // <Layout>
    <div className="">
      <ul className="">
        {categories?.map((c) => (
          <li key={c._id}>
            <Link className="" to={`/category/${c.slug}`}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    // </Layout>
  );
};

export default Categories;
