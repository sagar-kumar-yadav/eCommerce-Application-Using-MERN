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
        // console.log(data);
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
      {/* <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      <div className="app_container ">
        <AdminMenu />

        <div className="product_content mt-[7rem] m-auto">
          {/* {JSON.stringify(radio, null, 4)} */}

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
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className=""
                    alt={p.name}
                  />
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
