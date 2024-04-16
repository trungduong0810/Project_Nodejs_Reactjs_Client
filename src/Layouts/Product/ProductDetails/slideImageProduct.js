import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../App.css";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const SlideImageProduct = ({ slides }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1);
  };
  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="slideImgProduct  h-[500px] laptop:w-[35%] mobile:w-[100%] rounded-lg">
      <FontAwesomeIcon
        icon={faCircleChevronLeft}
        onClick={prevSlide}
        className="arrow arrow-left"
      />
      {slides &&
        slides.map((item, index) => {
          return (
            <img
              src={item}
              alt={item.alt}
              key={index}
              className={
                slide === index ? "slide rounded-lg" : "slide slide-hidden"
              }
            />
          );
        })}
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="img__item rounded-lg mobile:hidden laptop:flex">
        {slides.map((item, index) => {
          return (
            <div key={index} className="relative w-[60px] h-[60px]">
              <button
                key={index}
                className={
                  slide === index
                    ? "img__slide-product active__img"
                    : "img__slide-product overlay"
                }
              >
                <img
                  src={item}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              </button>
              <div
                onClick={() => setSlide(index)}
                className={`absolute w-full h-full bg-black inset-0 rounded-lg cursor-pointer ${
                  slide === index ? "opacity-0" : "opacity-75"
                } `}
              ></div>
            </div>
          );
        })}
      </span>
    </div>
  );
};

export default SlideImageProduct;
