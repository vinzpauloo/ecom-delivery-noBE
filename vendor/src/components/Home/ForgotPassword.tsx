import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

import styles from "./ForgotPassword.module.scss";
import constants from "../../utils/constants.json";
import { useCalculateHash } from "../../hooks/useCalculateHash";

import { useChangePass } from "../../hooks/useChangePass";

// Setup form schema & validation
interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email(constants.form.error.email).required(),
  })
  .required();

interface ContainerProps {}

const ForgotPassword: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const { calculateHash } = useCalculateHash();

  const { forgotPassword } = useChangePass();

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    setShowModal(true);
    try {
      // START: Forgot password API
      // *console.log("forgotPassword", data);

      const response = await forgotPassword({ ...data, type: "Merchant" });
      // *console.log("reset PW", response);
      // END: Access password API
      navigate("/forgot-password2");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError("*" + err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      // *console.log("Error", err);
    }
  };

  const [modal, setModal] = useState(false);

  // const ForgotModal = (props: any) => {
  //   return (
  //     <Modal
  //       {...props}
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Body>
  //         <div className={styles.container}>
  //           <h4 className="mb-4">Reset Password</h4>

  //           <Form
  //             className={`text-center ${styles.form}`}
  //             onSubmit={handleSubmit(onSubmit)}
  //           >
  //             <Form.Group className="mb-4 position-relative">
  //               <Form.Control
  //                 size="lg"
  //                 type="email"
  //                 placeholder="Enter email"
  //                 onKeyUp={() => setError("")}
  //                 required
  //                 {...register("email")}
  //               />
  //             </Form.Group>

  //             <Form.Group className="mb-4 position-relative">
  //               <Form.Control
  //                 size="lg"
  //                 type="text"
  //                 placeholder="Enter reset code"
  //                 onKeyUp={() => setError("")}
  //                 required
  //                 {...register("token")}
  //               />
  //             </Form.Group>

  //             <Form.Group className="mb-4 position-relative">
  //               <Form.Control
  //                 size="lg"
  //                 type="text"
  //                 placeholder="Enter new password"
  //                 onKeyUp={() => setError("")}
  //                 required
  //                 {...register("password")}
  //               />
  //             </Form.Group>

  //             <Form.Group className="mb-4 position-relative">
  //               <Form.Control
  //                 size="lg"
  //                 type="text"
  //                 placeholder="Confirm new password"
  //                 onKeyUp={() => setError("")}
  //                 required
  //                 {...register("password_confirmation")}
  //               />
  //             </Form.Group>

  //             <Button
  //               variant="primary"
  //               size="lg"
  //               type="submit"
  //               className="d-block w-100"
  //             >
  //               Reset Password
  //             </Button>
  //           </Form>
  //         </div>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // };

  return (
    <div className={styles.container}>
      <>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Button className={styles.spinnerBtn} variant="warning">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Please Wait...
          </Button>
        </Modal>
      </>
      <h4 className="mb-4">Reset Password</h4>

      <Form
        className={`text-center ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-4 position-relative">
          <Form.Control
            size="lg"
            type="email"
            placeholder="Enter email"
            onKeyUp={() => setError("")}
            required
            {...register("email")}
          />
        </Form.Group>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="d-block w-100"
        >
          Reset Password
        </Button>
        {/* <ForgotModal show={modal} onHide={() => setModal(false)} /> */}
      </Form>
    </div>
  );
};

export default ForgotPassword;
