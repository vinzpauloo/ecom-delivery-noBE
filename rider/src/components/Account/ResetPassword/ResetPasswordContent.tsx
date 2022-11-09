import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";

import styles from "./ResetPasswordContent.module.scss";

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
      <Form className={styles.form}>
        <div className={styles.formInnerContainer}>
          <h3>Reset Password</h3>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="User Name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Control
                  id="current_password"
                  type={currentPassword}
                  placeholder="Current Password"
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
                />
                <Link to="#" onClick={handleToggleRetypePassword}>
                  <EyeIcon type={retypePassword} />
                </Link>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className={styles.btnReset}>Reset Password</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordContent;
