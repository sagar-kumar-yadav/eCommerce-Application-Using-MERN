import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="dropdown flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 space-x-2">
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-current pt-1"
          viewBox="0 0 24 24"
        >
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="transition duration-300">
          {items.map((item, i) => (
            <li key={i} className="flex px-4 py-3 hover:bg-gray-50">
              <Link to={`/category/$c.slug`}></Link>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
