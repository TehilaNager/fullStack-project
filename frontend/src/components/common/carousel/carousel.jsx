import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Carousel({ title, items }) {
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        slidesPerGroup={3}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1200}
        navigation
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          600: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
