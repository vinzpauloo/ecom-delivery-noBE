import React, { useState } from "react";

import "./ProfileContent.scss";

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="account-container">
      {isEdit ? (
        <h3 className="mb-4">Edit Account</h3>
      ) : (
        <h3 className="mb-4">My Account</h3>
      )}

      <div className="account-container-2">
        <p>First Name*</p>
        <input />
      </div>

      <div className="account-container-2">
        <p>Last Name*</p>
        <input />
      </div>

      <div className="account-container-2">
        <p>User Name*</p>
        <input />
      </div>

      <div className="account-container-2">
        <p>Email*</p>
        <input />
      </div>

      <div className="account-container-2">
        <p>Contact Number*</p>
        <input />
      </div>

      <div className="buttons">
        {!isEdit && <button onClick={() => setIsEdit(!isEdit)}>Edit</button>}
        <button onClick={() => setIsEdit(false)}>Update</button>
      </div>
    </div>
  );
};

export default ProfileContent;
