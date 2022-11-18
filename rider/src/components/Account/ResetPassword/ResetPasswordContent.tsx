import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useChangePass } from "../../../hooks/useChangePass";

import styles from "./ResetPasswordContent.module.scss";
import constants from "../../../utils/constants.json";

// Setup form schema & validation
interface IFormInputs {
  password: string;
  password_confirmation: string;
  current_password: string;
}

const schema = yup
  .object({
    password: yup.string().min(6, constants.form.error.passwordMin).required(),
    password_confirmation: yup.string().required(),
    current_password: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const EyeIcon = ({ type }: { type: string }) => {
  return type === "password" ? (
    <EyeFill color="#8F887D" size={30} className={styles.icons} />
  ) : (
    <EyeSlashFill color="#8F887D" size={30} className={styles.icons} />
  );
};

const ResetPasswordContent: React.FC<ContainerProps> = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("password");
  const [newPassword, setNewPassword] = useState("password");
  const [retypePassword, setRetypePassword] = useState("password");

  const { getUser, updatePassword } = useChangePass();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const passwordChangeAlert = () => {
    alert("Password has been successfully updated.");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log("Requesting updateUser ...");

    const response = await updatePassword(data);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updatePassword);
    } else {
      setError(response.error);
    }
  };

  // Get user request
  // const handleGetUser = async () => {
  //   console.log("Requesting getUser ...");

  //   const response = await getUser();
  //   console.log("handleGetUser response", response);
  //   let defaultValues = {
  //     password: response.password,
  //   };

  //   reset(defaultValues);
  // };

  useEffect(() => {
    // handleGetUser();
  }, []);

  const handleToggleCurrentPassword = () => {
    if (currentPassword === "password") {
      setCurrentPassword("text");
      return;
    }
    setCurrentPassword("password");
  };
  const handleToggleNewPassword = () => {
    if (newPassword === "password") {
      setNewPassword("text");
      return;
    }
    setNewPassword("password");
  };
  const handleToggleRetypePassword = () => {
    if (retypePassword === "password") {
      setRetypePassword("text");
      return;
    }
    setRetypePassword("password");
  };

  return (
    <div>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInnerContainer}>
          <h3>Change Password</h3>
          {/* <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="Enter email or number"
                />
              </Form.Group>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="current_password"
                  type={currentPassword}
                  placeholder="Current Password"
                  {...register("current_password")}
                />
                <Link to="#" onClick={handleToggleCurrentPassword}>
                  <EyeIcon type={currentPassword} />
                </Link>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="new_password"
                  type={newPassword}
                  placeholder="New Password"
                  {...register("password")}
                />
                <Link to="#" onClick={handleToggleNewPassword}>
                  <EyeIcon type={newPassword} />
                </Link>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="retype_password"
                  type={retypePassword}
                  placeholder="Re-type Password"
                  {...register("password_confirmation")}
                />
                <Link to="#" onClick={handleToggleRetypePassword}>
                  <EyeIcon type={retypePassword} />
                </Link>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className={styles.btnReset}
                type="submit"
                onClick={passwordChangeAlert}
              >
                Reset Password
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordContent;
