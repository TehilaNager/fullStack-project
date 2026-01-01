import { Link } from "react-router";
import "./carousel.css";
import CardHome from "../cardHome/cardHome";
import { useState } from "react";

function Carousel({ title, subtitle, linkText, linkUrl, items = [] }) {
  const slides = items.reduce((acc, item, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const nextSlide = () => {
    if (activeIndex < slides.length - 1) setActiveIndex(activeIndex + 1);
  };

  return (
    <section className="home-section py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {linkText && linkUrl && (
            <Link to={linkUrl} className="requests-link">
              {linkText} <i className="bi bi-arrow-left-short fs-5 pe-1"></i>
            </Link>
          )}
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-inner">
            {slides.map((slideItems, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${
                  slideIndex === activeIndex ? "active" : ""
                }`}
              >
                <div className="d-flex justify-content-center flex-nowrap gap-5 px-2">
                  {slideItems.map((item) => (
                    <div
                      key={item._id}
                      style={{ flex: "0 0 auto", width: "300px" }}
                    >
                      <CardHome
                        idCard={item._id}
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        city={item.city}
                        priority={item.priority}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {activeIndex < slides.length - 1 && (
            <button
              className="carousel-control-next"
              onClick={nextSlide}
              type="button"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">הבא</span>
            </button>
          )}

          {activeIndex > 0 && (
            <button
              className="carousel-control-prev"
              onClick={prevSlide}
              type="button"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">קודם</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
