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
import searchIcon from "../../../assets/images/searchIcon.png";

import ImageUploading, { ImageListType } from "react-images-uploading";

import { useAuthUser } from "react-auth-kit";

import styles from "./ProductContent.module.scss";
import constants from "../../../utils/constants.json";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";

//Image Compressor
// import Compressor from "compressorjs";

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

const ProductAvailability = ({availability, id}) => {
  const {updateProductAvailability} = useProduct();
  const [check, setCheck] = useState(!!availability);

  const handleClick = async (bol) => {
    const response = await updateProductAvailability(id, {
      "is_available": bol
    })

    console.log(response)
  }
  return(
    <td>
      <Form.Check className={styles.checkInput} type="switch" checked={check} onChange={() => setCheck(!check)} onClick={() => handleClick(!check)}/>
  </td>
  )
}

const ProductContent: React.FC<ContainerProps> = ({}) => {
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [category, setCategory] = useState("");
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [cuisine, setCuisine] = useState("");
  const [product, setProduct] = useState<TMenu[] | null>(null);
  const [defaultImg, setDefaultImg] = useState(true);
  const [search, setSearch] = useState("");

  const [checked, setChecked] = React.useState(true);
  const [editItemId, setEditItemId] = useState(0);
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
    setEditItemId(id);
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
      is_available: checked,
      categories: [parseInt(data.categories)],
      cuisines: [parseInt(data.cuisines)],
      photo: images[0].photo,
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

  //Image Compressor
  // const [compressedFile, setCompressedFile] = useState(null);

  // const handleCompressedUpload = (e) => {
  //   const image = e.target.files[0];
  //   new Compressor(image, {
  //     quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
  //     success: (compressedResult) => {
  //       // compressedResult has the compressed file.
  //       // Use the compressed file to upload the images to your server.
  //       // setCompressedFile();
  //     },
  //   });
  // };
  //

  return (
    <div className={styles.tableContainer}>
      <div>
        <Form>
          <Row>
            <h3 className="d-none d-lg-block">Restaurant Menu</h3>
            <Row>
              <Col className="d-none d-lg-block">
                <Col className={`${styles.searchInput} search`}>
                  <input type="text" placeholder="Search order ID" value={search} onChange={(e) => setSearch(e.target.value)}/>
                  <img className={styles.searchIcon} src={searchIcon} alt="" />
                </Col>
              </Col>
              <Col className={styles.mobileHeader}>
                <h6 className="d-lg-none">Restaurant Menu</h6>
                <Row className={`${styles.buttonsContent}`}>
                  <Col className={`${styles.buttonCont} col-6`}>
                    <Button
                      className={styles.btnAddProduct}
                      // onClick={() => setMenuModal(true)}
                    >
                      Add Promo
                    </Button>
                  </Col>
                  <Col className={`${styles.buttonCont} col-6`}>
                    <Button
                      className={styles.btnAddProduct}
                      onClick={() => setMenuModal(true)}
                    >
                      Add Menu
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* Add menu Modal */}
            <Modal
              show={menuModal}
              onHide={() => setMenuModal(false)}
              size="xl"
            >
              {/* <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title id="contained-modal-title-vcenter">
                  Menu
                </Modal.Title>
              </Modal.Header> */}
              <Modal.Body className={styles.modalBody}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="col-10">
                      <h3>Menu</h3>
                    </Col>
                    <Col className={`${styles.menuListBtn} col-2`}>
                      <Button onClick={() => setMenuModal(false)}>Menu List</Button>
                    </Col>
                  </Row>
                  <hr />
                  <h5>Add Menu</h5>
                  <Row className="ps-3 pe-3">
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
                  <Row  className="ps-3 pe-3">
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
                  <Row  className="ps-3 pe-3">
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
                    </Col>
                    <Col>
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="photo"
                        maxFileSize={1572864}
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                          errors,
                        }) => (
                          <div className={styles.imageUploadContent}>
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
                                  <Row  className={styles.btnUploadContent}>
                                    {/* <button
                                      className={styles.btnUpload}
                                      onClick={() =>
                                        handleRemove(onImageRemove, index)
                                      }
                                    >
                                      Remove
                                    </button> */}
                                    <Form.Control
                                  value="Remove"
                                  type="button"
                                  className={styles.btnUpload}
                                  onClick={() =>
                                    handleRemove(onImageRemove, index)
                                  }
                                />
                                  </Row>
                                </div>
                              ))
                            )}
                            <Row className={styles.btnUploadContent}>
                                <Form.Control
                                  value="Upload"
                                  className={styles.btnUpload}
                                  onClick={() => handleClick(onImageUpload)}
                                />
                            </Row>
                            {errors && (
                              <div>
                                {errors.maxNumber && (
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Number of selected images exceed.
                                  </span>
                                )}
                                {errors.acceptType && (
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Your selected file type is not allowed.
                                  </span>
                                )}
                                {errors.maxFileSize && (
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Selected file size exceeded 1.5 MB.
                                  </span>
                                )}
                                {errors.resolution && (
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Selected file does not match the desired
                                    resolution
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </ImageUploading>
                    </Col>
                  </Row>
                  <Row  className="ps-3 pe-3">
                    <Col className={styles.availabilityContent}>
                      <Row>
                        <Form.Label>Availability</Form.Label>
                      </Row>
                      <Row className={styles.availability}>
                        <Col>No</Col>
                        <Col className={styles.switch}>
                          <Form.Check
                            type="switch"
                            defaultChecked={checked}
                            onChange={() => setChecked(!checked)}
                          />
                        </Col>
                        <Col>Yes</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row  className="ps-3 pe-3">
                    <Col className="d-flex justify-content-center gap-2 mt-4">
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
            {search !== "" ? (
            product?.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((item, index) => {
                return (
                  <tbody className={styles.tBody} key={index}>
                    <tr>
                      <td>
                        <p className={styles.textParagrap2}>{item.name}</p>
                      </td>
                      <td>
                        <p className={styles.textParagrap2}>Php {item.price}</p>
                      </td>
                      <ProductAvailability availability={item.is_available} id={item.id}/>
                      <td>
                        <div>
                          {/* <Button
                            className={styles.btnEdit}
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button> */}
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
              })
            ) : (
              product?.map((item, index) => {
                return (
                  <tbody className={styles.tBody} key={index}>
                    <tr>
                      <td>
                        <p className={styles.textParagrap2}>{item.name}</p>
                      </td>
                      <td>
                        <p className={styles.textParagrap2}>Php {item.price}</p>
                      </td>
                      <ProductAvailability availability={item.is_available} id={item.id}/>
                      <td>
                        <div>
                          <Button
                            className={styles.btnEdit}
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
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
              })
            )
          }
          </Table>
        </Form>
      </div>
      {editModal && <EditModal
        show={editModal}
        onHide={() => setEditModal(false)}
        id={editItemId}
        product={product}
        setEditModal={setEditModal}
      />}
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

  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [category, setCategory] = useState("");
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [cuisine, setCuisine] = useState("");
  const [product, setProduct] = useState<TMenu | null>(null);
  const [defaultImg, setDefaultImg] = useState(true);
  const [images, setImages] = React.useState<any>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(false);


  

  const maxNumber = 1;

  const { getProductInformation, editProduct } = useProduct();

  const loadRestaurantByProductId = async () => {
    const response = await getProductInformation(props.id);
    console.log("getRestaurantProduct response", response);
    setProduct(response);
    setName(response.name);
    setDescription(response.description);
    setPrice(response.price);
    setAvailability(!!response.is_available);
    // setImages(response.photo);
  };

  const loadCuisines = async () => {
    const response = await getCuisines();
    console.log("getCuisines response", response);
    setCuisines(response);
    setCuisine(response[0].id);
  };

  const loadCategories = async () => {
    const response = await getCategories();
    console.log("getCategories response", response);
    setCategories(response);
    setCategory(response[0].id);
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

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handleSave = async () => {
    props.setEditModal(false);
    const data = {
      name: name,
      description: description,
      price: `${price}`,
      photo: images[0].photo,
      is_available: availability,
      categories: [+category],
      cuisines: [+cuisine],
      restaurant_id: props.product[0].restaurant_id
    }

    const response = await editProduct(props.id, data);
    console.log("!!!",response);
  }

  useEffect(() => {
    loadCategories()
    loadCuisines()
    loadRestaurantByProductId();
  }, []);
    return (
      <Modal {...props} size="lg">
        <Modal.Body className={styles.modalBody}>
          <Form>
            <Row>
              <Col className="col-10">
                <h3>Menu</h3>
              </Col>
            </Row>
            <hr />
            <h5>Add Menu</h5>
            <Row className="ps-3 pe-3">
              <Col lg={4} xs={8}>
                <Form.Group className="position-relative">
                  <Form.Label>Food Name</Form.Label>
                  <Form.Control className={styles.inputForm} type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="ps-3 pe-3">
              <Col>
                <Form.Group className="position-relative">
                  <Form.Label>Food Description</Form.Label>
                  <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="ps-3 pe-3">
              <Col lg={4} xs={8}>
                <Form.Group className="position-relative">
                  <Form.Label>Price in PH-PESO</Form.Label>
                  <Form.Control className={styles.inputForm} type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>
                <Col lg={4} xs={8}>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    // {...register("categories")}
                    className={styles.btnCategory}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((categories) => (
                      <option value={categories.id}>
                        {categories.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col lg={4} xs={8}>
                <Form.Label>Cuisine</Form.Label>
                <Form.Select
                  // {...register("cuisines")}
                  className={styles.btnCuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  {cuisines?.map((cuisines) => (
                    <option value={cuisines.id}>{cuisines.name}</option>
                  ))}
                </Form.Select>
              </Col>
              </Col>
              <Col>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="photo"
                  maxFileSize={1572864}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    <div className={styles.imageUploadContent}>
                      {defaultImg ? (
                        <img
                          src={product?.photo}
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
                            <Row  className={styles.btnUploadContent}>
                              <Form.Control
                                value="Remove"
                                type="button"
                                className={styles.btnUpload}
                                onClick={() =>
                                  handleRemove(onImageRemove, index)
                                }
                              />
                            </Row>
                          </div>
                        ))
                      )}
                      <Row className={styles.btnUploadContent}>
                          <Form.Control
                            value="Upload"
                            className={styles.btnUpload}
                            onClick={() => handleClick(onImageUpload)}
                          />
                      </Row>
                      {errors && (
                        <div>
                          {errors.maxNumber && (
                            <span
                              style={{
                                color: "red",
                                fontWeight: "600",
                              }}
                            >
                              Number of selected images exceed.
                            </span>
                          )}
                          {errors.acceptType && (
                            <span
                              style={{
                                color: "red",
                                fontWeight: "600",
                              }}
                            >
                              Your selected file type is not allowed.
                            </span>
                          )}
                          {errors.maxFileSize && (
                            <span
                              style={{
                                color: "red",
                                fontWeight: "600",
                              }}
                            >
                              Selected file size exceeded 1.5 MB.
                            </span>
                          )}
                          {errors.resolution && (
                            <span
                              style={{
                                color: "red",
                                fontWeight: "600",
                              }}
                            >
                              Selected file does not match the desired
                              resolution
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </Col>
            </Row>
            <Row className="ps-3 pe-3">
              <Col className={styles.availabilityContent}>
                <Row>
                  <Form.Label>Availability</Form.Label>
                </Row>
                <Row className={styles.availability}>
                  <Col>No</Col>
                  <Col className={styles.switch}>
                  <Form.Check type="switch" checked={availability} onChange={() => setAvailability(!availability)}/>
                  </Col>
                    <Col>Yes</Col>
                </Row>
              </Col>
            </Row>
            <Row className="ps-3 pe-3">
              <Col className="d-flex justify-content-center gap-2 mt-4">
                <Button className={styles.btnDiscard} onClick={props.onHide}>
                  Discard
                </Button>
                <Button className={styles.btnSaveMenu} onClick={handleSave}>Save Menu</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
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


export default ProductContent;
