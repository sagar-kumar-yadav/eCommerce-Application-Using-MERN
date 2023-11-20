import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [name, setName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useCart();
  // console.log(values);

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

  // get search Name
  console.log(values.keyword);

  return (
    <Layout>
      <div className="">
        <h1 className="mt-28 text-center text-4xl font-bold mb-8">
          Results for "{values.keyword}"
        </h1>
        <h6 className="text-center">
          {values?.results.length < 1
            ? "No Product Found"
            : `Products ${values?.results.length}`}
        </h6>

        <div className="home_content w-[86%] m-auto pt-10">
          <div className="product_content ">
            {/* {JSON.stringify(radio, null, 4)} */}

            <div className="all_products_show_cont">
              {values?.results.map((p) => (
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
      </div>
    </Layout>
  );
};

export default Search;
