import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../../hooks/useUser";

import styles from "./ProfileContent.module.scss";
import constants from "../../../utils/constants.json";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";
import { createRefresh } from "react-auth-kit";

// Setup form schema & validation
interface IFormInputs {
  first_name: string;
  name: string;
  description: string;
  address: string;
  email: string;
  contact_number: string;
}

const schema = yup
  .object({
    first_name: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string(),
    email: yup.string().email(constants.form.error.email).required(),
    contact_number: yup.string().required(),
  })
  .required();

interface ContainerProps {}

const ProfileContent: React.FC<ContainerProps> = ({}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // const [disabledProfile, setDisabledProfile] = useState(true);

  // const handleInput = () => {
  //   setDisabledProfile(!disabledProfile);
  // };

  const navigate = useNavigate();

  const { getUser, updateUser } = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const onSubmit = async (data: IFormInputs) => {
    console.log(data);
    console.log("Requesting updateUser ...");

    const response = await updateUser(data);
    console.log("updateUser response", response);

    if (!response.error) {
      setMessage(constants.form.success.updateProfile);
    } else {
      setError(response.error);
    }
  };

  // Get user request
  const handleGetUser = async () => {
    console.log("Requesting getUser ...");

    const response = await getUser();
    console.log("handleGetUser response", response);
    let defaultValues = {
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      mobile: response.mobile,
      address: response.restaurant[0]?.address,
      contact_number: response.restaurant[0]?.contact_number,
      description: response.restaurant[0]?.description,
      name: response.restaurant[0]?.name,
      photo: response.restaurant[0]?.photo || "https://placeholder.com/",
    };
    reset(defaultValues);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className={styles.profileContentContainer}>
      <div className="">
        <h3>Restaurant Information</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("first_name")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("name")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Restaurant Description</Form.Label>
                <Form.Control
                  as="textarea"
                  onKeyUp={() => resetMessages()}
                  {...register("description")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Resturant Address</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("address")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row lg={2} xs={1}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => setError("")}
                  {...register("email")}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  onKeyUp={() => resetMessages()}
                  {...register("contact_number")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className={styles.btnUpdate} type="submit">
                Update
              </Button>
              <Button
                className={styles.btnChangePass}
                onClick={() => navigate("/account/reset-password")}
              >
                Change Password
              </Button>
            </Col>
          </Row>
          {/* Success messages */}
          <div className={styles.success}>
            <p className="text-success">{message}</p>
          </div>
        </Form>
      </div>
    </div>
  );
};

// // Setup form schema & validation
// interface IFormInputs {
//   first_name: string;
//   name: string;
//   description: string;
//   address: string;
//   email: string;
//   mobile: string;
// }

// const schema = yup
//   .object({
//     first_name: yup.string().required(),
//     name: yup.string().required(),
//     description: yup.string().required(),
//     address: yup.string(),
//     email: yup.string().email(constants.form.error.email).required(),
//     mobile: yup.string().required(),
//   })
//   .required();

// function ProfileModal(props: any) {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const { getUser, updateUser } = useUser();

//   const {
//     reset,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInputs>({
//     resolver: yupResolver(schema),
//   });

//   const resetMessages = () => {
//     setMessage("");
//     setError("");
//   };

//   const onSubmit = async (data: IFormInputs) => {
//     console.log(data);
//     console.log("Requesting updateUser ...");

//     const response = await updateUser(data);
//     console.log("updateUser response", response);

//     if (!response.error) {
//       setMessage(constants.form.success.updateProfile);
//     } else {
//       setError(response.error);
//     }
//   };

//   // Get user request
//   const handleGetUser = async () => {
//     console.log("Requesting getUser ...");

//     const response = await getUser();
//     console.log("handleGetUser response", response);
//     let defaultValues = {
//       email: response.email,
//       first_name: response.first_name,
//       last_name: response.last_name,
//       mobile: response.mobile,
//       address: response.restaurant[0]?.address,
//       contact_number: response.restaurant[0]?.contact_number,
//       description: response.restaurant[0]?.description,
//       name: response.restaurant[0]?.name,
//       photo: response.restaurant[0]?.photo || "https://placeholder.com/",
//     };
//     reset(defaultValues);
//   };

//   useEffect(() => {
//     handleGetUser();
//   }, []);

//   return (
//     <Modal {...props} size="lg">
//       <Modal.Header closeButton className={styles.modalHeader}>
//         {/* Success messages */}
//         <div className={styles.success}>
//           <p className="text-success">{message}</p>
//         </div>
//       </Modal.Header>
//       <Modal.Body className={styles.modalBody}>
//         <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Owner Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("first_name")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Restaurant Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("name")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Restaurant Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   onKeyUp={() => resetMessages()}
//                   {...register("description")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Resturant Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("address")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row lg={2} xs={1}>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("email")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group className="position-relative">
//                 <Form.Label>Contact Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   onKeyUp={() => resetMessages()}
//                   {...register("mobile")}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col></Col>
//           </Row>
//           <Row>
//             <Col>
//               <Button className={styles.btnUpdate} type="submit">
//                 Update
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

export default ProfileContent;
