import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import Banner from "../../components/HomeBanner/Banner";

const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [cart, setCart] = useCart();

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
      const url = `http://localhost:8080/api/v1/product/product-list/${page}`;
      setLoading(true);
      const { data } = await axios.get(url);
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
        setLoading(false);
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

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      const url = `http://localhost:8080/api/v1/product/product-list/${page}`;
      setLoading(true);
      const { data } = await axios.get(url);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <Banner/>
      <div className="home_container ">
        <div className="home_content w-[86%] m-auto pt-10">
          <div className="filterBar_cont pb-4 flex flex-col items-center justify-center sticky top-24">
            {/* --------------------------------- category filter ------------------------------------- */}
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

            {/*------------------------------ price filter ------------------------------------------------------------ */}
            <div className="category_box_filter">
              <div className="filter_cat_header">Filter By Price</div>
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

            {/* --------------------------------------------- reset button ---------------------------------------------- */}
            <div className="reset_btn ">
              <label onClick={() => window.location.reload()}>Reset</label>
            </div>
          </div>

          {/* products here ---------------------------------------------*/}
          <div className="product_content ">
            {/* {JSON.stringify(radio, null, 4)} */}

            <div className="all_products_show_cont">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="product_cont w-64 items-center justify-center p-3 mb-8"
                >
                  <div className="product_img cursor-pointer">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className=""
                      alt={p.name}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    />
                  </div>
                  <div className="product_name">{p.name}</div>
                  <div className="flex flex-col">
                    {/* <p className="">{p.description.substring(0, 30)}</p> */}
                    <p className="">$ {p.price}</p>
                  </div>

                  <button
                    className="bg-[#222] text-white w-24 rounded h-8"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Item Add to Cart");
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span class="material-symbols-outlined">
                        shopping_bag
                      </span>
                      <span>add</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center p-10 pl-56">
          {products && products.length < total && (
            <button
              className="bg-[#222] text-white rounded"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {/* {loading ? "Loading..." : "Load More"} */}
              {loading ? <span>Loading...</span> : <span>Load More</span>}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
