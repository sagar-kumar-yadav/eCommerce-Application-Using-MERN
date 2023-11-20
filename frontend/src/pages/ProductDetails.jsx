import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // get single product
  const getProduct = async () => {
    try {
      const url = `http://localhost:8080/api/v1/product/get-product/${params.slug}`;
      const { data } = await axios.get(url);
      if (data.success) {
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category._id);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get  similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const url = `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`;
      const { data } = await axios.get(url);
      if (data.success) {
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <h1>Product Details</h1> */}
      {JSON.stringify(product, null, 4)}

      <div className="">
        <div className="">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className=""
            alt={product.name}
          />
        </div>
        <div className="">
          <h1>Product details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <button className="">add to cart</button>
        </div>
      </div>
      <div className="">
        <h1>Similar Products</h1>
        {JSON.stringify(relatedProducts, null, 4)}
        {relatedProducts.length < 1 && <p>No similar product found</p>}
        <div className="all_products_show_cont">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="product_cont w-64 items-center justify-center">
              <div className="product_name">{p.name}</div>
              <div className="product_img">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className=""
                  alt={p.name}
                />
              </div>

              <div className="flex flex-col">
                <p className="">{p.description.substring(0, 30)}</p>
                <p className="">$ {p.price}</p>
              </div>
              <div className="flex">
                <button className="">add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
