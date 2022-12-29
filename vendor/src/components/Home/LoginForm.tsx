import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill, EnvelopeFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";

import ForgotPassword from "./ForgotPassword";
import styles from "./LoginForm.module.scss";
import constants from "../../utils/constants.json";
import { useCalculateHash } from "../../hooks/useCalculateHash";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

// Setup form schema & validation
interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup
  .object({
    // email: yup.string().email(constants.form.error.email).required(),
    username: yup.string().required(),
    password: yup
      .string()
      .min(6, constants.form.error.passwordMin)
      .max(32, constants.form.error.passwordMax)
      .required(),
  })
  .required();

interface ContainerProps {}

const EyeIcon = ({ type }: { type: string }) => {
  return type === constants.form.inputType.password ? (
    <EyeFill color={constants.color.gray} size={30} className={styles.icons} />
  ) : (
    <EyeSlashFill
      color={constants.color.gray}
      size={30}
      className={styles.icons}
    />
  );
};

const ForgotModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <ForgotPassword />
      </Modal.Body>
    </Modal>
  );
};

const LoginForm: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [authKitIsAuthenticated, setAutKitIsAuthenticated] = useState(false);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const { calculateHash } = useCalculateHash();

  const [passwordType, setPasswordType] = useState(
    constants.form.inputType.password
  );
  const navigate = useNavigate();

  useEffect(() => {
    setAutKitIsAuthenticated(isAuthenticated());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      // START: Access Login API
      const endpoint = "api/merchant/login";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access login API

      if (response.status === 200) {
        const { data } = response.data;

        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data.user,
        });

        navigate("/account");
      }
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("*" + err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      // *console.log("Error", err);
    }
  };

  const onTogglePasswordType = () => {
    if (passwordType === constants.form.inputType.password) {
      setPasswordType(constants.form.inputType.text);
      return;
    }
    setPasswordType(constants.form.inputType.password);
  };

  return (
    <>
      <ForgotModal show={modalShow} onHide={() => setModalShow(false)} />

      <Form
        className={`text-center ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className={`d-none d-md-block ${styles.header}`}>
          Welcome to FOODMONKEY Restaurant Owners
        </h4>
        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Email or number"
            onKeyUp={() => setError("")}
            required
            {...register("username")}
          />
          <EnvelopeFill color="#8F887D" size={30} className={styles.icons} />
        </Form.Group>

        <Form.Group className="mb-4 text-end position-relative">
          <Form.Control
            size="lg"
            type={passwordType}
            placeholder="Password"
            className="mb-2"
            required
            {...register("password")}
          />
          <Link to="#" onClick={onTogglePasswordType}>
            <EyeIcon type={passwordType} />
          </Link>
        </Form.Group>

        <div className="mb-5 position-relative text-end">
          <Row>
            <Col>
              <div className={styles.errors}>
                <p>{error}</p>
                <p>{errors.username?.message}</p>
                <p>{errors.password?.message}</p>
              </div>
            </Col>
            <Col>
              <Link
                to="/forgot-password"
                // onClick={() => setModalShow(true)}
                className={styles.forgotPassword}
              >
                Forgot Password?
              </Link>
            </Col>
          </Row>

          {/* Error Messages */}
        </div>

        <Button variant="primary" size="lg" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
