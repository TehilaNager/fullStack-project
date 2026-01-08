import { Link } from "react-router";
import "./carousel.css";
import CardHome from "../CardHome/CardHome";
import { useState, useEffect } from "react";

function Carousel({ title, subtitle, linkText, linkUrl, items = [] }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = isSmallScreen ? items.map((item) => [item]) : [];

  const prevSlide = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);
  const nextSlide = () =>
    activeIndex < slides.length - 1 && setActiveIndex(activeIndex + 1);

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h2 className="title">{title}</h2>
          <p className="description">{subtitle}</p>
        </div>

        {linkText && linkUrl && (
          <Link to={linkUrl} className="items-link">
            {linkText} <i className="bi bi-arrow-left-short fs-5"></i>
          </Link>
        )}
      </div>

      <div className="carousel-wrapper">
        {isSmallScreen ? (
          <div className="carousel-inner">
            {slides.map((slideItems, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${
                  slideIndex === activeIndex ? "active" : ""
                }`}
              >
                <div className="carousel-slide">
                  {slideItems.map((item) => (
                    <div className="carousel-card" key={item._id}>
                      <CardHome {...item} idCard={item._id} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {activeIndex > 0 && (
              <button className="carousel-arrow prev" onClick={prevSlide}>
                <i className="bi bi-chevron-right"></i>
                <span className="sr-only">הקודם</span>
              </button>
            )}

            {activeIndex < slides.length - 1 && (
              <button className="carousel-arrow next" onClick={nextSlide}>
                <i className="bi bi-chevron-left"></i>
                <span className="sr-only">הבא</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid-large">
            {items.map((item) => (
              <div className="carousel-card" key={item._id}>
                <CardHome {...item} idCard={item._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
