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
    <div className=" flex min-w-[278px] p-4 ml-32">
      <form onSubmit={handleSubmit} className="flex items-center w-96 ">
        <input
          type="search"
          className="bg-[#f5f5f6] h-10 text-[#696e79] rounded-l-lg flex-grow border-none"
          placeholder="Search for products brand and more"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className=" w-10">
          <span className="material-symbols-outlined  bg-[#f5f5f6] p-2 rounded-r-lg border-solid border-1 border-gray-300 h-10">
            search
          </span>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
