import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/v1/product/search/${values.keyword}`;
      const { data } = await axios.get(url);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex min-w-[278px] ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-96 h-10 border border-solid border-white outline-none "
      >
        <input
          type="search"
          className=" bg-transparent h-10 text-white  flex-grow border-none focus:outline-none focus:shadow-none"
          placeholder="Search for products brand and more"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className=" w-10">
          <span className="material-symbols-outlined  p-2 rounded-r-lg  h-10 text-white">
            search
          </span>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
