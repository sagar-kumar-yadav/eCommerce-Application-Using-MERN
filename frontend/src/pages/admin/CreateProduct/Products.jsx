import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./product.css";
import AdminMenu from "./../../../components/layout/AdminMenu/AdminMenu";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const url = "http://localhost:8080/api/v1/product/get-products";
      const { data } = await axios.get(url);
      if (data.success) {
        setProducts(data.products);
        console.log(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="app_container ">
        <AdminMenu />

        <div className="product_content m-auto p-[4.5rem] mt-16 overflow-y-scroll h-[100vh] scroll-smooth">
          <div className="all_products_show_cont">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="product_cont">
                  <div className="product_name">{p.name}</div>
                  <div className="product_img">
                    <img src={p.photos[0]} className="" alt={p.name} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
