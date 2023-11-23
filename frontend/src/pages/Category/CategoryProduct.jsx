import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      getProductByCategory();
    }
  }, [params?.slug]);

  const getProductByCategory = async () => {
    try {
      const url = `http://localhost:8080/api/v1/product/product-category/${params.slug}`;
      const { data } = await axios.get(url);
      console.log(data);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Category Wise Products</h1>
      <h1>{category?.name}</h1>
      <h1>{products?.length} result found</h1>
    </div>
  );
};

export default CategoryProduct;
