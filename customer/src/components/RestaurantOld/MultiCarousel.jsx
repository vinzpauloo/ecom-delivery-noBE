import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./MultiCarousel.css";

import { Autoplay } from "swiper";

import cat1 from "../../assets/images/category01.jpg";
import cat2 from "../../assets/images/category02.jpg";
import cat3 from "../../assets/images/category03.jpg";
import cat4 from "../../assets/images/category04.jpg";
import cat5 from "../../assets/images/category05.jpg";
import cat6 from "../../assets/images/category06.jpg";
import cat7 from "../../assets/images/category07.jpg";

const MultiCarousel = ({ category }) => {
  return (
    <div className="row">
      {/* <h3>Shop by {category}</h3> */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        modules={[Autoplay]}
        className="multi-carousel-container"
      >
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat1} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat2} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat3} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat4} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat5} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat6} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat7} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="multi-carousel-item">
            <div className="multi-carousel-image">
              <img src={cat4} alt="" />
            </div>
            <div className="multi-carousel-content">
              <div className="content">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="price">
                <span>423php</span>
              </div>
              <div className="button-container">
                <div className="number-input">
                  <button>-</button>
                  <p>1</p>
                  <button>+</button>
                </div>
                <div className="add-to-cart">
                  <button>
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MultiCarousel;
