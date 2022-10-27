import React, { useState } from "react";
import { Table } from "react-bootstrap";

import "./ProfileContent.scss";
import SearchIcon from "../../../assets/images/search.png";

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className="profile-content-container">
      <form>
        <h3>Restaurant Information</h3>
        <div className="">
          <div className="restoInfo1">
            <div className="restoInfo1-div">
              <label>My Restaurant</label>
              <input type="text" placeholder="JohnDoe2022" />
            </div>

            <div className="restoInfo1-div">
              <label>Restaurant Name</label>
              <input type="text" placeholder="Měiwèi de shíwù 美味的食物" />
            </div>

            <div className="restoInfo1-div">
              <label>Restaurant Description</label>
              <textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."></textarea>
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

          <div className="buttons">
            <a id="saveBtn" href="#">
              Save
            </a>
            <a id="editBtn" href="#">
              Edit
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileContent;
