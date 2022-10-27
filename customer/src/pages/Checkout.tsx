import { Link } from "react-router-dom";
import "./Checkout.scss";
import MultiCarousel from "./MultiCarousel";

interface ContainerProps {}

const Checkout: React.FC<ContainerProps> = () => {
  return (
    <div className="checkoutContainer">
      <div className="container">
        <div className="firstForm pt-4">
          <form>
            <h3>Delivery Details</h3>
            <div className="firstFormInput">
              <input className="inputText" placeholder="Email address" />
              <input className="inputText" placeholder="Contact number" />
              <input
                className="inputText"
                placeholder="Room Number, Building name, Street name"
              />

              <div className="checkBox">
                <input type="checkbox" />
                <label>Use this Address&nbsp;</label>
              </div>

              <input
                className="inputText"
                placeholder="Baranggay, Town or City, Province"
              />

              <div className="checkBox">
                <input type="checkbox" />
                <label>Add new Address</label>
              </div>
            </div>
          </form>
        </div>
        <div className="secondForm pt-4">
          <form>
            <h3>New Address</h3>
            <div className="secondFormInput">
              <input placeholder="Room Number, Building or Establishment name, Street name" />
              <input placeholder="Barangay, City or Town, Province" />
            </div>
          </form>
          <div className="secondFormCheckBox">
            <div>
              <input type="checkbox" />
              <label>Use this Address</label>
            </div>
            <div>
              <a>Confirm new Address</a>
            </div>
          </div>
        </div>
        <div className="order-bill-details">
          <div className="thirdForm pt-4">
            <h3>Order Summary</h3>
            <MultiCarousel />
          </div>
          <div className="fourthForm">
            <div className="checkout">
              <div className="checkout-left">
                <h3>BILL DETAILS</h3>
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
                    Total <span>₱1212</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/otp-order" className="button">
          Confirm Order
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
