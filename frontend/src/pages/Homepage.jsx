import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import "./homepage.css";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  // get all category
  const getAllCategory = async () => {
    try {
      const url = "http://localhost:8080/api/v1/category/get-category";
      const { data } = await axios.get(url);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

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

  // get total count
  const getTotal = async () => {
    try {
      const url = "http://localhost:8080/api/v1/product/product-count";
      const { data } = await axios.get(url);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const url = "http://localhost:8080/api/v1/product/product-filter";
      const { data } = await axios.post(url, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="home_container">
        <img src="/src/assets/banner/banner.jpg" alt="" />
        <div className="home_content">
          <div className="filterBar_cont pb-4 flex flex-col items-center justify-center">
            <div className="category_box_filter">
              <div className="filter_cat_header">Filter By Category</div>
              <div className="inner_cat_box">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>

            {/* price filter */}
            <div className="category_box_filter">
              <div className="filter_cat_header">Filter By Category</div>
              <div className="inner_cat_box">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

            
            <div className="reset_btn ">
              <label className=" " onClick={() => window.location.reload()}>
                Reset
              </label>
            </div>
          </div>

          {/* products here ---------------------------------------------*/}
          <div className="product_content">
            {/* {JSON.stringify(radio, null, 4)} */}
           
            <div className="all_products_show_cont">
              {products?.map((p) => (
                <div className="product_cont">
                  <div className="product_name">{p.name}</div>
                  <div className="product_img">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className=""
                      alt={p.name}
                    />
                  </div>

                  {/* <div className="">
                  <p className="">{p.description.substring(0, 30)}</p>
                  <p className="">$ {p.price}</p>
                  <button className="">more details</button>
                  <button className="">add to cart</button>
                </div> */}
                </div>
              ))}
            </div>
            <div className="">
              {products && products.length < total && (
                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
