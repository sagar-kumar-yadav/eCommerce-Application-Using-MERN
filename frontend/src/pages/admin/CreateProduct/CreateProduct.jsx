import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../../../components/layout/AdminMenu/AdminMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./product.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const url = "http://localhost:8080/api/v1/product/create-product";
      const { data } = axios.post(url, productData);

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="app_container ">
        <AdminMenu />

        <section className=" h-[80%] max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Create Product
          </h1>
          <form className=" overflow-auto h-[72vh]">
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 p-4">
              <div>
                <label className="text-white dark:text-gray-200">
                  Select a category
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md "
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white ">Product Name</label>
                <input
                  id="username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  required
                />
              </div>

              <div>
                <label className="text-white ">Quantity</label>
                <input
                  id="number"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200">
                  Select shipping
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md "
                  value={shipping ? "Yes" : "No"}
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div>
                <label className="text-white dark:text-gray-200">
                  Description
                </label>
                <textarea
                  id="textarea"
                  type="textarea"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800  dark:border-gray-600 "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200">Price</label>
                <input
                  id="number"
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white"></label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        {photo ? photo.name : "Upload Photo"}

                        <input
                          id="file-upload"
                          name="photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          multiple
                          required
                        />
                      </label>
                      <p className="pl-1 text-white">or drag and drop</p>
                    </div>
                    

                    <div className="text-xs text-white">
                      PNG, JPG, up to 1MB
                      <div className=" w-48">
                        {photo && (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product_photo"
                              height={"200px"}
                              className="img img-responsive"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCreate}
                  className=" mr-12 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                  Create Product
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default CreateProduct;
