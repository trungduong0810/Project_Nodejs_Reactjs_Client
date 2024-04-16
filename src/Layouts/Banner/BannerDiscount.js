import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import bannerDiscount from "../../Assets/image/banner-discount.jpg";
// import bannerDiscount2 from "../../Assets/image/bannerDiscout2.webp";

const slides = [
  {
    src: "https://pubcdn.ivymoda.com/files/news/2024/02/28/b4f738b7e35f83667091139df3aac36a.jpg",
    alt: "Image 1 for carousel",
  },
  {
    src: "https://pubcdn.ivymoda.com/files/news/2024/04/03/96f4d5dcd1c2468c5d8490e5e23797a9_1.jpg",
    alt: "Image 3 for carousel",
  },
];

export const BannerDiscount = () => {
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
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <div className="carousel screen__container laptop:h-[70vh] mobile:h-[50vh] rounded-lg overflow-hidden">
      <FontAwesomeIcon
        icon={faCircleChevronLeft}
        onClick={prevSlide}
        className="arrow arrow-left"
      />
      {slides &&
        slides.map((item, index) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={index}
              className={slide === index ? "slide" : "slide slide-hidden"}
            />
          );
        })}
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {slides.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
