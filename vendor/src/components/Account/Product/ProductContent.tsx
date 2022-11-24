import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHelper } from "../../../hooks/useHelper";
import { useProduct } from "../../../hooks/useProduct";
import { useCategories } from "../../../hooks/useCategories";
import { useCuisines } from "../../../hooks/useCuisines";

import ImageUploading, { ImageListType } from "react-images-uploading";

import { useAuthUser } from "react-auth-kit";

import styles from "./ProductContent.module.scss";
import constants from "../../../utils/constants.json";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";

interface ContainerProps {}

type TMenu = {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  is_available: boolean;
};

// Setup form schema & validation
interface IFormInputs {
  name: string;
  description: string;
  price: string;
  photo: string;
  categories: string;
  cuisines: string;
}

type Categories = {
  id: number;
  name: string;
  photo: string;
};

type Cuisines = {
  id: number;
  name: string;
  photo: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
  })
  .required();

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ProductContent: React.FC<ContainerProps> = ({}) => {
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [product, setProduct] = useState<TMenu[] | null>(null);
  const [defaultImg, setDefaultImg] = useState(true);

  const [images, setImages] = React.useState<any>();

  const [file, setFile] = useState();
  const [fileDataURL, setFileDataURL] = useState("");

  const maxNumber = 1;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const { postProduct, getProduct, deleteProduct } = useProduct();

  const loadCategories = async () => {
    const response = await getCategories();
    console.log("getCategories response", response);
    setCategories(response);
  };

  const loadCuisines = async () => {
    const response = await getCuisines();
    console.log("getCuisines response", response);
    setCuisines(response);
  };

  const handleEdit = (id: any) => {
    setEditModal(true);
    console.log(id);
  };

  const discardMenu = async () => {
    window.location.reload();
    navigate("/account/my-restaurant-menu");
  };

  const handleClick = (onImageUpload: any) => {
    console.log("aaaa");
    setDefaultImg((prev) => !prev);
    onImageUpload();
  };

  const handleRemove = (onImageRemove: any, index: any) => {
    onImageRemove(index);
    setDefaultImg((prev) => !prev);
  };

  const handleDelete = async (id: any) => {
    const params = {
      restaurant_id: auth()?.restaurant[0].id,
    };
    const response = await deleteProduct(id, params);
    console.log(response);
    alert("Product Deleted");
    window.location.reload();
    navigate("/account/my-restaurant-menu");
  };

  const auth = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const loadRestaurantProduct = async () => {
    const params = {
      restaurant_id: auth()?.restaurant[0].id,
      with: "restaurant",
    };
    console.log(params);

    const response = await getProduct(params);
    console.log("getRestaurantProduct response", response);
    setProduct(response);
  };

  //   const loadRestaurantByProductId = async () => {
  //   const params = {
  //     id: auth()?.id,
  //   };
  //   console.log(params);

  //   const response = await getProductById(params);
  //   console.log("getRestaurantProduct response", response);
  //   setProduct(response);
  // };

  const onSubmit = async (data: IFormInputs) => {
    const menu = {
      ...data,
      restaurant_id: auth()?.restaurant[0].id,
      is_available: true,
      categories: [parseInt(data.categories)],
      cuisines: [parseInt(data.cuisines)],
      photo2: images[0].photo,
    };

    console.log("onSubmit", menu);

    const response = await postProduct(menu);
    console.log("add product response", response);

    if (!response.error) {
      setMessage(constants.form.success.addProduct);
      window.location.reload();
    } else {
      setError(response.error);
    }

    // const response = await uploadToFirebase(file);

    // uploadToFirebase(file).then((response) => {
    //   console.log(response);
    // });

    // console.log(response);
  };

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    console.log(e.target.files);
    setFile(file);
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  // const uploadImage = async (e: any) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file)
  //   console.log(e.target.files);
  // };

  // const convertBase64=(file)=> {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload(() => {
  //       resolve(fileReader.result);
  //     });

  //     fileReader.onerror((error) => {
  //       reject(error);
  //     })
  //   });
  // };

  useEffect(() => {
    loadCategories();
    loadCuisines();
    loadRestaurantProduct();

    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          {/* <Row>
            <Col>
              <h3 className="d-none d-lg-block">Restaurant Menu</h3>
            </Col>
          </Row> */}
          <Row>
            {/* <Col className="d-none d-lg-block">
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col> */}
            <Col>
              <h3 className="d-none d-lg-block">Restaurant Menu</h3>
            </Col>
            {/* Button trigger modal */}
            <Col>
              <h3 className="d-lg-none">Restaurant Menu</h3>
              <Button
                className={styles.btnAddProduct}
                onClick={() => setMenuModal(true)}
              >
                Add Menu
              </Button>
              {/* Add menu Modal */}
              <Modal
                show={menuModal}
                onHide={() => setMenuModal(false)}
                size="xl"
              >
                <Modal.Header closeButton className={styles.modalHeader}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Menu
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <h6>Add Menu</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} xs={8}>
                        <Form.Group className="position-relative">
                          <Form.Label>Food Name</Form.Label>
                          <Form.Control
                            className={styles.inputForm}
                            type="text"
                            required
                            {...register("name")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="position-relative">
                          <Form.Label>Food Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            required
                            {...register("description")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} xs={8}>
                        <Form.Group className="position-relative">
                          <Form.Label>Price in PH-PESO</Form.Label>
                          <Form.Control
                            className={styles.inputForm}
                            type="text"
                            required
                            {...register("price")}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col>
                        <img src={fileDataURL} className={styles.thumbNail} />
                      </Col> */}
                      <Col>
                        <ImageUploading
                          multiple
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey="photo"
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            <div className="">
                              {defaultImg ? (
                                <img
                                  src={DefaultThumbnail}
                                  style={{ width: "100px" }}
                                />
                              ) : (
                                imageList.map((image, index) => (
                                  <div key={index} className="image-item">
                                    <img
                                      src={image.photo}
                                      className={styles.thumbNail}
                                      alt="ad-img"
                                    />
                                    <div className="image-item__btn-wrapper">
                                      <a
                                        onClick={() =>
                                          handleRemove(onImageRemove, index)
                                        }
                                      >
                                        Remove
                                      </a>
                                    </div>
                                  </div>
                                ))
                              )}
                              <Row className="">
                                <Col>
                                  <Form.Control
                                    placeholder="Upload"
                                    className={styles.btnUpload}
                                    onClick={() => handleClick(onImageUpload)}
                                  />
                                </Col>
                              </Row>
                            </div>
                          )}
                        </ImageUploading>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4} xs={8}>
                        <Form.Label>Category</Form.Label>

                        <Form.Select
                          {...register("categories")}
                          className={styles.btnCategory}
                        >
                          {categories?.map((categories) => (
                            <option value={categories.id}>
                              {categories.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      {/* <Col>
                        <Form.Control
                          className={styles.btnUpload}
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          // value="https://via.placeholder.com/150"
                          onChange={changeHandler}
                          // {...register("photo")}
                        />
                      </Col> */}
                    </Row>

                    <Row>
                      <Col lg={4} xs={8}>
                        <Form.Label>Cuisine</Form.Label>
                        <Form.Select
                          {...register("cuisines")}
                          className={styles.btnCuisine}
                        >
                          {cuisines?.map((cuisines) => (
                            <option value={cuisines.id}>{cuisines.name}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Label>Availability</Form.Label>
                        <Form.Check type="switch" checked={true} disabled />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-center gap-2">
                        <Button
                          className={styles.btnDiscard}
                          onClick={discardMenu}
                        >
                          Discard
                        </Button>
                        <Button className={styles.btnAddProduct} type="submit">
                          Add Menu
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <Table>
            <thead className={styles.tHeader}>
              <tr>
                <th>
                  <p className={styles.textParagrap}>Name</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Price</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Availability</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Action</p>
                </th>
              </tr>
            </thead>
            {product?.map((item, index) => {
              return (
                <tbody className={styles.tBody} key={index}>
                  <tr>
                    <td>
                      <p className={styles.textParagrap2}>{item.name}</p>
                    </td>
                    <td>
                      <p className={styles.textParagrap2}>Php {item.price}</p>
                    </td>
                    <td>
                      <Form.Check type="switch" checked={item.is_available} />
                    </td>
                    <td>
                      <div>
                        {/* <Button
                          className={styles.btnEdit}
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button> */}
                        {/* <EditModal
                          show={editModal}
                          onHide={() => setEditModal(false)}
                        /> */}
                        <Button
                          className={styles.btnDelete}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                        {/* <DeleteModal
                          show={deleteModal}
                          onHide={() => setDeleteModal(false)}
                        /> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Form>
      </div>
    </div>
  );
};

// // Setup form schema & validation
// interface IFormInputs {
//   name: string;
//   description: string;
//   price: string;
//   photo: string;
// }

// const schema = yup
//   .object({
//     name: yup.string().required(),
//     description: yup.string().required(),
//     price: yup.string().required(),
//   })
//   .required();

// function MenuModal(props: any) {
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const { postProduct } = useProduct();

//   const auth = useAuthUser();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInputs>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: IFormInputs) => {
//     const menu = {
//       ...data,
//       restaurant_id: auth()?.restaurant[0].id,
//       is_available: true,
//       cuisines: [],
//     };

//     console.log("onSubmit", menu);

//     const response = await postProduct(menu);
//     console.log("add product response", response);

//     if (!response.error) {
//       setMessage(constants.form.success.addProduct);
//       window.location.reload();
//     } else {
//       setError(response.error);
//     }

//     const response = await uploadToFirebase(file);

//     uploadToFirebase(file).then((response) => {
//       console.log(response);
//     });

//     console.log(response);
//   };

// const { uploadToFirebase } = useHelper();

// return (
//   <Modal {...props} size="xl">
//     <Modal.Header closeButton className={styles.modalHeader}>
//       <Modal.Title id="contained-modal-title-vcenter">Menu</Modal.Title>
//     </Modal.Header>
//     <Modal.Body className={styles.modalBody}>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Row>
//           <Col>
//             <h6>Add Menu</h6>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={4} xs={8}>
//             <Form.Group className="position-relative">
//               <Form.Label>Food Name</Form.Label>
//               <Form.Control
//                 className={styles.inputForm}
//                 type="text"
//                 required
//                 {...register("name")}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Form.Group className="position-relative">
//               <Form.Label>Food Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 required
//                 {...register("description")}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={4} xs={8}>
//             <Form.Group className="position-relative">
//               <Form.Label>Price in PH-PESO</Form.Label>
//               <Form.Control
//                 className={styles.inputForm}
//                 type="text"
//                 required
//                 {...register("price")}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <img src={fileDataURL} className={styles.thumbNail} />
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={4} xs={8}>
//             <Form.Label>Category</Form.Label>
//             <Dropdown>
//               <Dropdown.Toggle className={styles.btnCategory}>
//                 Category
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item href="#action-1">Category1</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//           <Col>
//             <Form.Control
//               className={styles.btnUpload}
//               type="text"
//               accept=".png, .jpg, .jpeg"
//               value="https://via.placeholder.com/150"
//               onChange={changeHandler}
//               {...register("photo")}
//             />
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={4} xs={8}>
//             <Form.Label>Cuisine</Form.Label>
//             <Dropdown>
//               <Dropdown.Toggle className={styles.btnCuisine}>
//                 Cuisine
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item href="#action-1">Cuisine1</Dropdown.Item>
//                 <Dropdown.Item href="#action-2">Cuisine2</Dropdown.Item>
//                 <Dropdown.Item href="#action-3">Cuisine3</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//           <Col>
//             <Form.Label>Availability</Form.Label>
//             <Form.Check type="switch" />
//           </Col>
//         </Row>
//         <Row>
//           <Col className="d-flex justify-content-center gap-2">
//             <Button className={styles.btnDiscard} onClick={props.onHide}>
//               Discard
//             </Button>
//             <Button className={styles.btnAddProduct} type="submit">
//               Add Menu
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Modal.Body>
//   </Modal>
// );
// }

function EditModal(props: any) {
  // const [product, setProduct] = useState<TMenu[] | null>(null);
  // const { getProductById } = useProduct();
  // const auth = useAuthUser();
  // const loadRestaurantByProductId = async () => {
  //   const params = {
  //     id: auth()?.id,
  //   };
  //   console.log(params);
  //   const response = await getProductById(params);
  //   console.log("getRestaurantProduct response", response);
  //   setProduct(response);
  // };
  // useEffect(() => {
  //   loadRestaurantByProductId();
  // }, []);
  //   return (
  //     <Modal {...props} size="lg">
  //       <Modal.Header closeButton className={styles.modalHeader}>
  //         <Modal.Title id="contained-modal-title-vcenter">Menu</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body className={styles.modalBody}>
  //         <Form>
  //           <Row>
  //             <Col>
  //               <h6>Add Menu</h6>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col lg={4} xs={8}>
  //               <Form.Group className="position-relative">
  //                 <Form.Label>Food Name</Form.Label>
  //                 <Form.Control className={styles.inputForm} type="text" />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <Form.Group className="position-relative">
  //                 <Form.Label>Food Description</Form.Label>
  //                 <Form.Control as="textarea" />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col lg={4} xs={8}>
  //               <Form.Group className="position-relative">
  //                 <Form.Label>Price in PH-PESO</Form.Label>
  //                 <Form.Control className={styles.inputForm} type="text" />
  //               </Form.Group>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col lg={4} xs={8}>
  //               <Form.Label>Category</Form.Label>
  //               <Dropdown>
  //                 <Dropdown.Toggle className={styles.btnCategory}>
  //                   Category
  //                 </Dropdown.Toggle>
  //                 <Dropdown.Menu>
  //                   <Dropdown.Item href="#action-1">Category1</Dropdown.Item>
  //                   <Dropdown.Item href="#action-2">Category2</Dropdown.Item>
  //                   <Dropdown.Item href="#action-3">Category3</Dropdown.Item>
  //                 </Dropdown.Menu>
  //               </Dropdown>
  //             </Col>
  //             <Col>
  //               <Button className={styles.btnUpload}>Upload</Button>
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col lg={4} xs={8}>
  //               <Form.Label>Cuisine</Form.Label>
  //               <Dropdown>
  //                 <Dropdown.Toggle className={styles.btnCuisine}>
  //                   Cuisine
  //                 </Dropdown.Toggle>
  //                 <Dropdown.Menu>
  //                   <Dropdown.Item href="#action-1">Cuisine1</Dropdown.Item>
  //                   <Dropdown.Item href="#action-2">Cuisine2</Dropdown.Item>
  //                   <Dropdown.Item href="#action-3">Cuisine3</Dropdown.Item>
  //                 </Dropdown.Menu>
  //               </Dropdown>
  //             </Col>
  //             <Col>
  //               <Form.Label>Availability</Form.Label>
  //               <Form.Check type="switch" />
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col className="d-flex justify-content-center gap-2">
  //               <Button className={styles.btnDiscard} onClick={props.onHide}>
  //                 Discard
  //               </Button>
  //               <Button className={styles.btnSaveMenu}>Save Menu</Button>
  //             </Col>
  //           </Row>
  //         </Form>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // }
  // function DeleteModal(props: any) {
  //   return (
  //     <Modal {...props} size="lg">
  //       <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
  //       <Modal.Body className={styles.modalBody}>
  //         <h3 className={`d-flex justify-content-center ${styles.alert}`}>
  //           Are you sure you want to delete this menu?
  //         </h3>
  //         <Row>
  //           <Col className="d-flex justify-content-center gap-2">
  //             <Button className={styles.btnYes}>Yes</Button>
  //             <Button className={styles.btnNo}>No</Button>
  //           </Col>
  //         </Row>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // }
}

export default ProductContent;
