import React from "react";
import "./Menu.scss";
import chineseIcon from "../../assets/images/restau01.png";

import cat1 from "../../assets/images/category01.jpg";
import cat2 from "../../assets/images/category02.jpg";
import cat3 from "../../assets/images/category03.jpg";
import cat4 from "../../assets/images/category04.jpg";
import cat5 from "../../assets/images/category05.jpg";
import cat6 from "../../assets/images/category06.jpg";
import cat7 from "../../assets/images/category07.jpg";
import FoodCarousel from "./FoodCarousel";
import { Link } from "react-router-dom";
import MultiCarousel from "../../pages/MultiCarousel";

const Menu = () => {
  return (
    <div className="menuContainer">
      <div className="container pt-5 mx-auto d-flex flex-row justify-content-center align-items-center">
        <div className="left">
          <div className="filters">
            <h3>Filters</h3>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="list">
            <ul className="firstList">
              <h3>Category</h3>
              <div className="list-1">
                <input type="checkbox" />
                <li>Veggies</li>
              </div>
              <div className="list-2">
                <input type="checkbox" />
                <li>Non Veggies</li>
              </div>
              <div className="list-3">
                <input type="checkbox" />
                <li>All Meat</li>
              </div>
            </ul>

            <ul className="secondList">
              <h3>Sort By</h3>
              <div className="list-1">
                <input type="checkbox" />
                <li>Price - Low to high</li>
              </div>
              <div className="list-2">
                <input type="checkbox" />
                <li>Price - High to Low</li>
              </div>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="d-flex justify-content-between">
            <div className="rightDiv-1">
              <img src={chineseIcon} alt="" />
              <div>
                <h3>Chan's Chinese Cuisine</h3>
                <p>
                  What is the Chan’s Chinese cuisine?
                  <br />
                  Asian Fusion uses traditional Asian-style ingredients,
                  <br /> dishes and techniques to create innovative and
                  <br /> flavorful new fusions. It is a cuisine style that
                  typically combines
                  <br /> Asian foods with the likes of traditional Mexican,
                  <br /> American or other Asian-style dishes.
                </p>
              </div>
            </div>
            <div className="rightDiv-1-buttons">
              <a id="memberBtn">Request for a Membership Discounts</a>
              <a id="postedBtn">Keep me posted about promos!</a>
            </div>
          </div>
          <div>
            <FoodCarousel />
            {/* <MultiCarousel /> */}
          </div>
          <div className="cat-promos d-flex justify-content-between my-4">
            <img id="cat-promos-1" src={cat1} />
            <img src={cat2} />
            <img src={cat3} />
            <img src={cat4} />
            <img src={cat5} />
          </div>

          <div className="d-flex flex-row">
            <div className="ordered-items">
              <h4>Ordered Items</h4>
              <div className="ordered-items-images">
                <div className="ordered-items-choices">
                  <div>
                    <img src={cat1} />
                    <div className="d-flex gap-2 justify-content-center">
                      <button>-</button>
                      <p>2</p>
                      <button>+</button>
                    </div>
                  </div>

                  <div>
                    <img src={cat2} />
                    <div className="d-flex gap-2 justify-content-center">
                      <button>-</button>
                      <p>2</p>
                      <button>+</button>
                    </div>
                  </div>

                  <div>
                    <img src={cat3} />
                    <div className="d-flex gap-2 justify-content-center">
                      <button>-</button>
                      <p>2</p>
                      <button>+</button>
                    </div>
                  </div>

                  {/* <div>
                    <img src={cat4} />
                    <div className="d-flex gap-2 justify-content-center">
                      <button>-</button>
                      <p>2</p>
                      <button>+</button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="checkout">
              <div className="checkout-left">
                <p>
                  Item Count <span>003</span>
                </p>
                <p>
                  <a>Sub Total</a> <span>₱1126</span>
                </p>
                <p>
                  <a>Delivery Fee</a> <span>₱86</span>
                </p>
                <div className="total-padding">
                  <p id="total">
                    <a>Total</a> <span>₱1212</span>
                  </p>
                </div>
              </div>
              <div className="checkout-right">
                <Link to="/checkout" id="checkoutBtn">
                  Check out
                </Link>
                <a id="cancelBtn">Cancel Order</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
