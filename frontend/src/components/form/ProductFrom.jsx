import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photos: [],
  });

  const handleInputChange = (e) => {
    if (e.target.name === "photos") {
      setFormData({
        ...formData,
        [e.target.name]: Array.from(e.target.files),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    for (let key in formData) {
      if (key === "photos") {
        formData[key].forEach((file) => {
          formPayload.append(key, file);
        });
      } else {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      const url = "http://localhost:8080/api/v1/product/create-product";
      const response = await fetch(url, {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          photos: [],
        });
      } else {
        alert(data.message || "Failed to add product"); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

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

  return (
    <form onSubmit={handleSubmit}>
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

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <br />
      {/* Other input fields for description, price, category, quantity */}
      <input
        type="file"
        name="photos"
        multiple
        accept="image/*"
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
