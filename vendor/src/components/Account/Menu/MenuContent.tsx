import React, { useState } from "react";
import { Table } from "react-bootstrap";

import "./MenuContent.scss";
import SearchIcon from "../../../assets/images/search.png";

interface ContainerProps {}

const MenuContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className="account-container">
      <div className="table-container">
        <div className="table-header">
          <div className="table-header-1">
            <h3 className="mb-3">
              <strong>Restaurant Menu</strong>
            </h3>
            <div className="search">
              <input type="text" placeholder="Search food and description" />
              <img src={SearchIcon} alt="" />
            </div>
          </div>

          <div className="table-header-buttons">
            <a>Add Menu</a>
          </div>
        </div>

        <Table size="sm">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
            <tr>
              <td>Title of the food</td>
              <td>Food Description</td>
              <td>100 php</td>
              <td>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </td>
              <td className="action-buttons">
                <a>Edit</a>
                <a>Delete</a>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* <AddDeleteTableRows /> */}

        <div className="page-number">
          <a className="page-turn">&#60;</a>
          <a>1</a>
          <a>&nbsp;of</a>
          <a>&nbsp;5</a>
          <a className="page-turn">&#62;</a>
        </div>
      </div>
    </div>
  );
};

export default MenuContent;
