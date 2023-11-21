import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDot } from "react-icons/rx";
// import banner1 from "../../assets/banner/banner2.webp";
// import banner2 from "../../assets/banner/banner3.webp";
// import banner3 from "../../assets/banner/banner1.webp";
// import banner4 from "../../assets/banner/banner5.webp";
// import banner5 from "../../assets/banner/banner4.webp";

const slides = [
  {
    url: "src/assets/banner/banner2.webp",
  },
  {
    url: "src/assets/banner/banner3.webp",
  },
  {
    url: "src/assets/banner/banner1.webp",
  },
  {
    url: "src/assets/banner/banner5.webp",
  },
  {
    url: "src/assets/banner/banner4.webp",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    // console.log(isLastSlide);
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  const goToSlide = (slideIndex) => {
    console.log(slideIndex);
    setCurrentSlide(slideIndex);
  };

  //   console.log(currentSlide);
  return (
    <div className=" h-[780px] w-full m-auto relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2  bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {/* dot length */}
      <div className="flex justify-center py-2 absolute top-[95%] -translate-x-0 translate-y-[-95%] left-[45%]">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slide)}
            className="text-2xl cursor-pointer"
          >
            <RxDot />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
