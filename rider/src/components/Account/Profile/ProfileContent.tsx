import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./ProfileContent.scss";

import bike1 from "../../../assets/images/bike1.png";
import bike2 from "../../../assets/images/bike2.png";
import bike3 from "../../../assets/images/bike3.png";
import bike4 from "../../../assets/images/bike4.png";
import bike5 from "../../../assets/images/bike5.png";

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="profile-content-container">
      <div className="right">
        <form>
          <h3>My Account</h3>
          <div className="restoInfo1">
            <div className="restoInfo1-div">
              <label>Full name</label>
              <input type="text" placeholder="Alexan Louise Torio" />
            </div>

            <div className="restoInfo1-div">
              <label>Motor Vehicle</label>
              <input type="text" placeholder="Yamaha T-MAX 2022" />
            </div>
          </div>

          <div className="restoInfo2">
            <div className="restoInfo2-div">
              <label>Building number and Name</label>
              <input placeholder="Unit 123, GT Tower Intl. " />
            </div>

            <div className="restoInfo2-div">
              <label>Street Name and Barangay</label>
              <input placeholder="Ayala Avenue, Brgy Poblacion" />
            </div>

            <div className="restoInfo2-div">
              <label>City or Town, Pincode</label>
              <input placeholder="Makati City 4114" />
            </div>

            <div className="restoInfo2-div">
              <label>Landmark</label>
              <input placeholder="In front of RCBC tower " />
            </div>

            <div className="restoInfo2-div">
              <label>Email</label>
              <input placeholder="JohnDoe2022@gmail.com" />
            </div>

            <div className="restoInfo2-div">
              <label>Contact Number</label>
              <input placeholder="(+63) 917 456 7890" />
            </div>
          </div>

          <div className="bike-images">
            <img src={bike1} alt="" />
            <img src={bike2} alt="" />
            <img src={bike3} alt="" />
            <img src={bike4} alt="" />
            <img src={bike5} alt="" />
          </div>

          <div className="buttons">
            <a id="saveBtn" href="#">
              Edit
            </a>
            <a id="editBtn" href="#">
              Update
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileContent;
