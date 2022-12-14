import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHelper } from "../../../hooks/useHelper";
import { useProduct } from "../../../hooks/useProduct";
import { useCategories } from "../../../hooks/useCategories";
import { useCuisines } from "../../../hooks/useCuisines";
import { useFlavors } from "../../../hooks/useFlavor";
import searchIcon from "../../../assets/images/searchIcon.png";

import ImageUploading, { ImageListType } from "react-images-uploading";

import { useAuthUser } from "react-auth-kit";

import styles from "./ProductContent.module.scss";
import constants from "../../../utils/constants.json";
import Lottie from "lottie-react";
import updateSuccess from "../../../assets/update-success.json";

import SearchIcon from "../../../assets/images/search.png";
import DefaultThumbnail from "../../../assets/images/default-thumbnail.jpg";
import FlavorsList from "./FlavorsList";

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

type TFlavor = {
  id: number;
  name: string;
  description: string;
  default_price: number;
  price: number;
};

type TCurrentFlavor = {
  flavor_id: number;
  flavor_price: number;
  price: number;
};

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
  })
  .required();

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ProductAvailability = ({ availability, id }) => {
  const { updateProductAvailability } = useProduct();
  const [check, setCheck] = useState(!!availability);

  const handleClick = async (bol) => {
    const response = await updateProductAvailability(id, {
      is_available: bol,
    });

    console.log(response);
  };
  return (
    <td>
      <Form.Check
        className={styles.checkInput}
        type="switch"
        checked={check}
        onChange={() => setCheck(!check)}
        onClick={() => handleClick(!check)}
      />
    </td>
  );
};

const ProductContent: React.FC<ContainerProps> = ({}) => {
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [product, setProduct] = useState<TMenu[] | null>(null);
  const [defaultImg, setDefaultImg] = useState(true);
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [editItemId, setEditItemId] = useState(0);
  const [images, setImages] = React.useState<any>();
  const [price, setPrice] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const [defaultFlavors, setDefaultFlavors] = useState<TFlavor[]>([]);
  const [currentFlavors, setCurrentFlavors] = useState<TCurrentFlavor[]>([]);

  const [file, setFile] = useState();
  const [fileDataURL, setFileDataURL] = useState("");

  const maxNumber = 1;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const { postProduct, getProduct, deleteProduct } = useProduct();
  const { getFlavors } = useFlavors();

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

  const loadFlavors = async () => {
    const response = await getFlavors();
    console.log("getFlavors response", response);
    setDefaultFlavors(response);
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
    setErrorHandling(false);
    setImages(undefined);
  };

  const handleDelete = async (id: any) => {
    const params = {
      restaurant_id: auth()?.restaurant[0].id,
    };
    const response = await deleteProduct(id, params);
    console.log(response);
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
    setPageLength(Math.ceil(response.length / 10));
  };

  const onSubmit = async (data: IFormInputs) => {
    console.log("on submit ....");
    console.log("currentFlavors", currentFlavors);

    if (!!!images) {
      setErrorHandling(true);
    } else {
      setErrorHandling(false);
    }
    const menu = {
      ...data,
      restaurant_id: auth()?.restaurant[0].id,
      is_available: checked,
      categories: [parseInt(data.categories)],
      cuisines: [parseInt(data.cuisines)],
      photo: images[0].photo,
      flavors: currentFlavors,
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
    setErrorHandling(false);
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
    setStart((prev) => prev - 10);
    setEnd((prev) => prev - 10);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
    setStart((prev) => prev + 10);
    setEnd((prev) => prev + 10);
  };

  useEffect(() => {
    loadCategories();
    loadCuisines();
    loadRestaurantProduct();
    loadFlavors();

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
      <div>
        <Form>
          <Row>
            <h3 className="d-none d-lg-block">Restaurant Menu</h3>
            <Row>
              <Col className="d-none d-lg-block">
                <Col className={`${styles.searchInput} search`}>
                  <input
                    type="text"
                    placeholder="Search order ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <img className={styles.searchIcon} src={searchIcon} alt="" />
                </Col>
              </Col>
              <Col className={styles.mobileHeader}>
                <h6 className="d-lg-none">Restaurant Menu</h6>
                <Row className={`${styles.buttonsContent}`}>
                  <Col className={`${styles.buttonCont} col-6`}>
                    {/* <Button
                      className={styles.btnAddProduct}
                      onClick={() => setMenuModal(true)}
                    >
                      Add Promo
                    </Button> */}
                  </Col>
                  <Col className={`${styles.buttonCont} col-6`}>
                    <Button
                      type="button"
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
              <Modal.Body className={styles.modalBody}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="col-10">
                      <h3 className="d-none d-lg-block">Menu</h3>
                      <h3 className="d-lg-none">Add Menu</h3>
                    </Col>
                    <Col className={`${styles.menuListBtn} col-2`}>
                      <Button type="button" onClick={() => setMenuModal(false)}>
                        Menu List
                      </Button>
                    </Col>
                  </Row>
                  <hr className="d-none d-lg-block" />
                  <h5 className="d-none d-lg-block">Add Menu</h5>
                  <Row className={`${styles.mobileRow} ps-lg-3 pe-lg-3`}>
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
                  <Row className={`${styles.mobileRow} ps-lg-3 pe-lg-3`}>
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
                  {window.innerWidth <= 990 ? (
                    <>
                      <Row className={`${styles.mobileRow} d-lg-none`}>
                        <Col>
                          <Form.Group className="position-relative">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              className={styles.inputForm}
                              type="text"
                              required
                              {...register("price")}
                            />
                          </Form.Group>
                        </Col>
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
                      <Row className={`${styles.mobileRow} d-lg-none`}>
                        <Col>
                          <Form.Label>Cuisine</Form.Label>
                          <Form.Select
                            {...register("cuisines")}
                            className={styles.btnCuisine}
                          >
                            {cuisines?.map((cuisines, index) => (
                              <option value={cuisines.id} key={index}>
                                {cuisines.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col>
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            {...register("categories")}
                            className={styles.btnCategory}
                          >
                            {categories?.map((categories, index) => (
                              <option value={categories.id} key={index}>
                                {categories.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row
                        className="d-lg-none"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageUploading
                          multiple
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey="photo"
                          maxFileSize={150000}
                          acceptType={["jpg", "png"]}
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
                              {imageList.length === 0 ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={DefaultThumbnail}
                                    style={{ width: "150px", height: "100px" }}
                                    alt=""
                                  />
                                  <Row className={styles.btnUploadContent}>
                                    <Form.Control
                                      value="Upload"
                                      className={styles.btnUpload}
                                      onClick={() => handleClick(onImageUpload)}
                                    />
                                  </Row>
                                </div>
                              ) : (
                                imageList.map((image, index) => (
                                  <div key={index} className={styles.imageItem}>
                                    <img
                                      src={image.photo}
                                      className={styles.thumbNail}
                                      alt="ad-img"
                                    />
                                    <div>
                                      {/* <Row className={styles.btnUploadContent}>
                                        <Form.Control
                                          value="Remove"
                                          type="button"
                                          className={styles.btnUpload}
                                          onClick={() =>
                                            handleRemove(onImageRemove, index)
                                          }
                                        />
                                      </Row> */}
                                      <Row className={styles.btnUploadContent}>
                                        <Form.Control
                                          value="Upload"
                                          className={styles.btnUpload}
                                          onClick={() =>
                                            handleClick(onImageUpload)
                                          }
                                        />
                                      </Row>
                                    </div>
                                  </div>
                                ))
                              )}
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
                                      Selected file size exceeded 150 KB.
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
                              {errorHandling && (
                                <span
                                  style={{
                                    color: "red",
                                    fontWeight: "600",
                                  }}
                                >
                                  Photo for the menu is needed
                                </span>
                              )}
                            </div>
                          )}
                        </ImageUploading>

                        {/* Flavor list for Mobile*/}
                        <FlavorsList
                          defaultFlavors={defaultFlavors}
                          currentFlavors={currentFlavors}
                          setCurrentFlavors={setCurrentFlavors}
                        />
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row className="d-none d-lg-flex ps-3 pe-3">
                        <Col lg={4} xs={8}>
                          <Col>
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
                          <Col lg={4} xs={8}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              {...register("categories")}
                              className={styles.btnCategory}
                            >
                              {categories?.map((categories, index) => (
                                <option value={categories.id} key={index}>
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
                              {cuisines?.map((cuisines, index) => (
                                <option value={cuisines.id} key={index}>
                                  {cuisines.name}
                                </option>
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
                            maxFileSize={150000}
                            acceptType={["jpg", "png"]}
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
                                {imageList.length === 0 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={DefaultThumbnail}
                                      style={{
                                        width: "150px",
                                        height: "100px",
                                      }}
                                      alt=""
                                    />
                                    <Row className={styles.btnUploadContent}>
                                      <Form.Control
                                        value="Upload"
                                        className={styles.btnUpload}
                                        onClick={() =>
                                          handleClick(onImageUpload)
                                        }
                                      />
                                    </Row>
                                  </div>
                                ) : (
                                  imageList.map((image, index) => (
                                    <div
                                      key={index}
                                      className={styles.imageItem}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <img
                                        src={image.photo}
                                        className={styles.thumbNail}
                                        alt="ad-img"
                                      />
                                      <div>
                                        {/* <Row
                                          className={styles.btnUploadContent}
                                        >
                                          <Form.Control
                                            value="Remove"
                                            type="button"
                                            className={styles.btnUpload}
                                            onClick={() =>
                                              handleRemove(onImageRemove, index)
                                            }
                                          />
                                        </Row> */}
                                        <Row
                                          className={styles.btnUploadContent}
                                        >
                                          <Form.Control
                                            value="Upload"
                                            className={styles.btnUpload}
                                            onClick={() =>
                                              handleClick(onImageUpload)
                                            }
                                          />
                                        </Row>
                                      </div>
                                    </div>
                                  ))
                                )}
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
                                        Selected file size exceeded 150 KB.
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
                                {errorHandling && (
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Photo for the menu is needed
                                  </span>
                                )}
                              </div>
                            )}
                          </ImageUploading>

                          {/* Flavor list */}
                          <Row className="mt-3">
                            <Col className="col-9">
                              <FlavorsList
                                defaultFlavors={defaultFlavors}
                                currentFlavors={currentFlavors}
                                setCurrentFlavors={setCurrentFlavors}
                              />
                            </Col>
                            <Col className="d-none d-lg-block ps-3 pe-3 col-3">
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
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  )}
                  <Row className="ps-3 pe-3">
                    <Col className="d-flex justify-content-center gap-2 mt-lg-4">
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
            {search !== ""
              ? product
                  ?.filter((item) =>
                    item.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <tbody className={styles.tBody} key={index}>
                        <tr>
                          <td>
                            <p className={styles.textParagrap2}>{item.name}</p>
                          </td>
                          <td>
                            <p className={styles.textParagrap2}>
                              Php {item.price}
                            </p>
                          </td>
                          <ProductAvailability
                            availability={item.is_available}
                            id={item.id}
                          />
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
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
              : product?.slice(start, end).map((item, index) => {
                  return (
                    <tbody className={styles.tBody} key={index}>
                      <tr>
                        <td>
                          <p className={styles.textParagrap2}>{item.name}</p>
                        </td>
                        <td>
                          <p className={styles.textParagrap2}>
                            Php {item.price}
                          </p>
                        </td>
                        <ProductAvailability
                          availability={item.is_available}
                          id={item.id}
                        />
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
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
                })}
          </Table>
        </Form>
        {product?.length !== 0 ? (
          <Row>
            <Col className={styles.pagination}>
              <Button
                disabled={start === Math.min(0, start)}
                className={styles.arrowContainer}
                onClick={handlePrev}
              >
                <ChevronLeft className={styles.arrow} />
              </Button>
              <span>
                {" "}
                {page} of {pageLength}{" "}
              </span>
              <Button
                disabled={(!!product && product?.length) <= Math.max(0, end)}
                className={styles.arrowContainer}
                onClick={handleNext}
              >
                <ChevronRight className={styles.arrow} />
              </Button>
            </Col>
          </Row>
        ) : (
          <h2 style={{ textAlign: "center" }}>No Menu</h2>
        )}
      </div>
      {editModal && (
        <EditModal
          show={editModal}
          onHide={() => setEditModal(false)}
          id={editItemId}
          product={product}
          setEditModal={setEditModal}
        />
      )}
      <UpdateSuccessModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
      />
    </div>
  );
};

function EditModal(props: any) {
  const { getCategories } = useCategories();
  const { getCuisines } = useCuisines();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [category, setCategory] = useState("1");
  const [cuisines, setCuisines] = useState<Cuisines[]>([]);
  const [cuisine, setCuisine] = useState("1");
  const [product, setProduct] = useState<TMenu | null>(null);
  const [defaultImg, setDefaultImg] = useState(true);
  const [images, setImages] = React.useState<any>();
  const [defaultFlavors, setDefaultFlavors] = useState<TFlavor[]>([]);
  const [currentFlavors, setCurrentFlavors] = useState<TCurrentFlavor[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(false);

  const maxNumber = 1;

  const { getProductInformation, editProduct } = useProduct();
  const { getFlavors } = useFlavors();

  const loadFlavors = async () => {
    const response = await getFlavors();
    console.log("getFlavors response", response);
    setDefaultFlavors(response);
  };

  const loadRestaurantByProductId = async () => {
    const response = await getProductInformation(props.id);
    console.log("getRestaurantProduct response", response);
    setCurrentFlavors(response.flavors);
    setProduct(response);
    setName(response.name);
    setDescription(response.description);
    setPrice(response.price);
    setAvailability(!!response.is_available);
    if (response.categories.length > 0) {
      setCategory(response.categories[0].id);
    }
    if (response.cuisines.length > 0) {
      setCuisine(response.cuisines[0].id);
    }
  };

  const loadCuisines = async () => {
    const response = await getCuisines();
    console.log("getCuisines response", response);
    setCuisines(response);
    // setCuisine(response[0].id);
  };

  const loadCategories = async () => {
    const response = await getCategories();
    console.log("getCategories response", response);
    setCategories(response);
    // setCategory(response[0].id);
  };

  const handleClick = (onImageUpload: any) => {
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
    console.log("!!!", currentFlavors);
    const flavors = currentFlavors.map((item) => {
      return {
        flavor_id: item.flavor_id,
        flavor_price: item.price ?? item.flavor_price,
      };
    });
    let data = {};
    if (!!images) {
      data = {
        name: name,
        description: description,
        price: `${price}`,
        photo: images[0].photo,
        is_available: availability,
        categories: [+category],
        cuisines: [+cuisine],
        restaurant_id: props.product[0].restaurant_id,
        flavors: flavors,
      };
    } else {
      data = {
        name: name,
        description: description,
        price: `${price}`,
        // photo: images[0].photo,
        is_available: availability,
        categories: [+category],
        cuisines: [+cuisine],
        restaurant_id: props.product[0].restaurant_id,
        flavors: flavors,
      };
    }

    console.log("!!!", data);
    const response = await editProduct(props.id, data);
  };

  useEffect(() => {
    loadCategories();
    loadCuisines();
    loadRestaurantByProductId();
    loadFlavors();
  }, []);
  return (
    <Modal {...props} size="xl">
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Row>
            <Col className="col-10">
              <h3 className="d-none d-lg-block">Menu</h3>
              <h3 className="d-lg-none">Add Menu</h3>
            </Col>
          </Row>
          <hr className="d-none d-lg-block" />
          <h5 className="d-none d-lg-block">Add Menu</h5>
          <Row className={`${styles.mobileRow} ps-lg-3 pe-lg-3`}>
            <Col lg={4} xs={8}>
              <Form.Group className="position-relative">
                <Form.Label>Food Name</Form.Label>
                <Form.Control
                  className={styles.inputForm}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className={`${styles.mobileRow} ps-lg-3 pe-lg-3`}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Food Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* FOR DESKTOP */}
          <Row className="d-none d-lg-flex ps-3 pe-3">
            <Col lg={4} xs={8}>
              <Form.Group className="position-relative">
                <Form.Label>Price in PH-PESO</Form.Label>
                <Form.Control
                  className={styles.inputForm}
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Col lg={4} xs={8}>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  // {...register("categories")}
                  className={styles.btnCategory}
                  onChange={(e) => setCategory(e.target.value)}
                  // value={category}
                >
                  {categories?.map((categories, index) => (
                    <option
                      selected={+category === categories.id ? true : false}
                      value={categories.id}
                      key={index}
                    >
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
                  {cuisines?.map((cuisines, index) => (
                    <option
                      selected={+cuisine === cuisines.id ? true : false}
                      value={cuisines.id}
                      key={index}
                    >
                      {cuisines.name}
                    </option>
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
                maxFileSize={150000}
                acceptType={["jpg", "png"]}
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
                    {imageList.length === 0 ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={product?.photo}
                          style={{ width: "150px", height: "100px" }}
                          alt=""
                        />
                        <Row className={styles.btnUploadContent}>
                          <Form.Control
                            value="Upload"
                            className={styles.btnUpload}
                            onClick={() => handleClick(onImageUpload)}
                          />
                        </Row>
                      </div>
                    ) : (
                      imageList.map((image, index) => (
                        <div
                          key={index}
                          className={styles.imageItem}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={image.photo}
                            className={styles.thumbNail}
                            alt="ad-img"
                          />
                          <Row className={styles.btnUploadContent}>
                            <Form.Control
                              value="Remove"
                              type="button"
                              className={styles.btnUpload}
                              onClick={() => handleRemove(onImageRemove, index)}
                            />
                          </Row>
                        </div>
                      ))
                    )}
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
                            Selected file size exceeded 150 KB.
                          </span>
                        )}
                        {errors.resolution && (
                          <span
                            style={{
                              color: "red",
                              fontWeight: "600",
                            }}
                          >
                            Selected file does not match the desired resolution
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
              <Row className="mt-3">
                <Col className="col-9">
                  <FlavorsList
                    defaultFlavors={defaultFlavors}
                    currentFlavors={currentFlavors}
                    setCurrentFlavors={setCurrentFlavors}
                  />
                </Col>
                <Col className="d-none d-lg-block ps-3 pe-3">
                  <Col className={styles.availabilityContent}>
                    <Row>
                      <Form.Label>Availability</Form.Label>
                    </Row>
                    <Row className={styles.availability}>
                      <Col>No</Col>
                      <Col className={styles.switch}>
                        <Form.Check
                          type="switch"
                          checked={availability}
                          onChange={() => setAvailability(!availability)}
                        />
                      </Col>
                      <Col>Yes</Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* FOR MOBILE CODE START */}
          <Row className={`${styles.mobileRow} d-lg-none`}>
            <Col>
              <Form.Group className="position-relative">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className={styles.inputForm}
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col className={styles.availabilityContent}>
              <Row>
                <Form.Label>Availability</Form.Label>
              </Row>
              <Row className={styles.availability}>
                <Col>No</Col>
                <Col className={styles.switch}>
                  <Form.Check
                    type="switch"
                    checked={availability}
                    onChange={() => setAvailability(!availability)}
                  />
                </Col>
                <Col>Yes</Col>
              </Row>
            </Col>
          </Row>
          <Row className={`${styles.mobileRow} d-lg-none`}>
            <Col>
              <Form.Label>Cuisine</Form.Label>
              <Form.Select
                onChange={(e) => setCuisine(e.target.value)}
                className={styles.btnCuisine}
              >
                {cuisines?.map((cuisines, index) => (
                  <option
                    selected={+cuisine === cuisines.id ? true : false}
                    value={cuisines.id}
                    key={index}
                  >
                    {cuisines.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) => setCategory(e.target.value)}
                className={styles.btnCategory}
              >
                {categories?.map((categories, index) => (
                  <option
                    selected={+category === categories.id ? true : false}
                    value={categories.id}
                    key={index}
                  >
                    {categories.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="d-lg-none">
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="photo"
              maxFileSize={150000}
              acceptType={["jpg", "png"]}
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
                  {imageList.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={product?.photo}
                        style={{ width: "150px", height: "100px" }}
                        alt=""
                      />
                      <Row className={styles.btnUploadContent}>
                        <Form.Control
                          value="Upload"
                          className={styles.btnUpload}
                          onClick={() => handleClick(onImageUpload)}
                        />
                      </Row>
                    </div>
                  ) : (
                    imageList.map((image, index) => (
                      <div
                        key={index}
                        className={styles.imageItem}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={image.photo}
                          className={styles.thumbNail}
                          alt="ad-img"
                        />
                        <Row className={styles.btnUploadContent}>
                          <Form.Control
                            value="Remove"
                            type="button"
                            className={styles.btnUpload}
                            onClick={() => handleRemove(onImageRemove, index)}
                          />
                        </Row>
                      </div>
                    ))
                  )}
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
                          Selected file size exceeded 150 KB.
                        </span>
                      )}
                      {errors.resolution && (
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          Selected file does not match the desired resolution
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
            <FlavorsList
              defaultFlavors={defaultFlavors}
              currentFlavors={currentFlavors}
              setCurrentFlavors={setCurrentFlavors}
            />
          </Row>
          <Row className="ps-3 pe-3">
            <Col className="d-flex justify-content-center gap-2 mt-4">
              <Button className={styles.btnDiscard} onClick={props.onHide}>
                Discard
              </Button>
              <Button className={styles.btnSaveMenu} onClick={handleSave}>
                Save Menu
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const UpdateSuccessModal = (props: any) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className={`text-center p-4`}>
          <Lottie animationData={updateSuccess} loop={true} />
          <p className="mt-4" style={{ fontWeight: "400" }}>
            Profile has been updated
          </p>

          <Link
            to="/account/for-delivery"
            className={`d-inline-block mt-2`}
            style={{
              background: "#e6b325",
              border: "none",
              borderRadius: "5px",
              color: "black",
              fontSize: "16px",
              fontWeight: "300",
              width: "180px",
              padding: "6px",
              textDecoration: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Next
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

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
