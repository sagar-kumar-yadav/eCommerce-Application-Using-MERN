import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../../../components/layout/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../../components/form/categoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/v1/category/create-category";
      const { data } = await axios.post(url, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
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

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/v1/category/update-category/${selected._id}`;
      const { data } = await axios.put(url, {
        name: updatedName,
      });
      if (data.success) {
        toast.success(`${updatedName} is required`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  // delete category | pid means product id
  const handleDelete = async (pId) => {
    try {
      const url = `http://localhost:8080/api/v1/category/delete-category/${pId}`;
      const { data } = await axios.delete(url);
      if (data.success) {
        toast.success("category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      {/* <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          {/* <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table> */}

      {/* </div> */}
      {/* </div>  */}

      <div className="app_container ">
        <AdminMenu />

        <div className=" w-[100%] max-h-[100%] ">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <div className="flex flex-col max-w-4xl p-6 mx-auto text-white bg-gray-800 mt-5 w-[100%] max-h-[100%] overflow-auto h-[40vh] rounded-lg">
            <div className="products_list_wrap  ">
              <div className=" ">
                {categories?.map((c) => (
                  <div className="flex items-center justify-between">
                    <div>
                      <span>{c.name}</span>
                    </div>
                    <div>
                      <button
                        className=""
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className=""
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
