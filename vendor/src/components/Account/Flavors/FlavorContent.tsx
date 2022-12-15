import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHelper } from "../../../hooks/useHelper";
import { useProduct } from "../../../hooks/useProduct";
import { useFlavors } from "../../../hooks/useFlavor";
import searchIcon from "../../../assets/images/searchIcon.png";
import { useAuthUser } from "react-auth-kit";
import styles from "./FlavorContent.module.scss";
import constants from "../../../utils/constants.json";
import Lottie from "lottie-react";
import updateSuccess from "../../../assets/update-success.json";

//Image Compressor
// import Compressor from "compressorjs";

interface ContainerProps {}

type TMenu = {
  id: number;
  name: string;
  description: string;
  default_price: number;
  is_available: boolean;
};

// Setup form schema & validation
const schema = yup
  .object({
    name: yup.string().required(),
    default_price: yup.string().required(),
  })
  .required();

const FlavorContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [flavors, setFlavors] = useState<TMenu[] | null>(null);
  const [search, setSearch] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [editItemId, setEditItemId] = useState(0);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const { getFlavors, postFlavor, deleteFlavor } = useFlavors();

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = (id: any) => {
    setEditModal(true);
    setEditItemId(id);
  };

  const handleDelete = async (id: any) => {
    const response = await deleteFlavor(id);
    // *console.log(response);
    window.location.reload();
    navigate("/account/my-restaurant-menu");
  };

  const loadFlavors = async () => {
    const response = await getFlavors();
    // *console.log("@@@", response);
    setFlavors(response);
    setPageLength(Math.ceil(response.length / 10));
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

  const closeModalFlavor = () => {
    reset();
    setMenuModal(false);
  };

  const saveModalFlavor = async (data: any) => {
    const datas = { ...data, default_price: +data.default_price };
    const response = await postFlavor(datas);
    window.location.reload();
    setMenuModal(false);
  };

  useEffect(() => {
    loadFlavors();
  }, []);

  const UpdateSuccessModal = (props: any) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={`text-center p-4`}>
            <Lottie animationData={updateSuccess} loop={true} />
            <p className="mt-4" style={{ fontWeight: "400" }}>
              Flavor has been updated
            </p>

            <Link
              to="/account/flavors"
              onClick={() => setUpdateModalShow(false)}
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

  return (
    <div className={styles.tableContainer}>
      <div>
        <Form onSubmit={handleSubmit(saveModalFlavor)}>
          <Row>
            <h3 className="d-none d-lg-block">Available Flavors</h3>
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
                <h6 className="d-lg-none">Available Flavors</h6>
                <Row className={`${styles.buttonsContent}`}>
                  <Col className={`${styles.buttonCont} col-6`}>
                    <Button
                      type="button"
                      className={styles.btnAddProduct}
                      onClick={() => setMenuModal(true)}
                    >
                      Add Flavor
                    </Button>
                  </Col>
                  {/* <Col className={`${styles.buttonCont} col-6`}>
                    <Button
                      onClick={() => setUpdateModalShow(true)}
                      type="button"
                      className={styles.btnAddProduct}
                    >
                      Update Listing
                    </Button>
                  </Col> */}
                </Row>
              </Col>
            </Row>
            {/* Add menu Modal */}
            <Modal
              show={menuModal}
              onHide={() => setMenuModal(false)}
              size="lg"
              className="mt-5"
            >
              <Modal.Body className={styles.modalBody}>
                <Form>
                  {/* onSubmit={handleSubmit(onSubmit)} */}
                  <Table className={styles.table}>
                    <thead className={styles.tableHeader}>
                      <Row>
                        <Col>
                          <p>Flavor Name</p>
                        </Col>
                        <Col>
                          <p>Price</p>
                        </Col>
                        <Col>
                          <p>Action</p>
                        </Col>
                      </Row>
                    </thead>
                    <tbody className={styles.tableBody}>
                      <Row>
                        <Col
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            style={{ height: "100%" }}
                            type="text"
                            placeholder="Flavor Name"
                            // value={addFlavor}
                            // onChange={(e) => setAddFlavor(e.target.value)}
                            {...register("name")}
                            required
                          />
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            style={{ height: "100%" }}
                            type="text"
                            placeholder="0.00"
                            // value={addPrice}
                            // onChange={(e) => setAddPrice(e.target.value)}
                            {...register("default_price")}
                            required
                          />
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Row className={styles.buttonsContent}>
                            <Col>
                              <Button
                                className={styles.buttons}
                                onClick={closeModalFlavor}
                              >
                                Cancel
                              </Button>
                            </Col>
                            <Col>
                              <Button className={styles.buttons} type="submit">
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </tbody>
                  </Table>
                </Form>
              </Modal.Body>
            </Modal>
          </Row>
          <Table>
            <thead className={styles.tHeader}>
              <tr>
                <th>
                  <p className={styles.textParagrap}>Flavor Name</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Price</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Action</p>
                </th>
                {/* <th>
                  <p className={styles.textParagrap}>Availability</p>
                </th> */}
              </tr>
            </thead>
            {search !== ""
              ? flavors
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
                              Php {item.default_price}
                            </p>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Button
                                className={styles.btnDelete}
                                onClick={() => handleDelete(item.id)}
                              >
                                Remove
                              </Button>
                              <Button
                                className={styles.btnEdit}
                                onClick={() => handleEdit(item.id)}
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                          {/* <ProductAvailability
                            availability={item.is_available}
                            id={item.id}
                          /> */}
                        </tr>
                      </tbody>
                    );
                  })
              : flavors?.slice(start, end).map((item, index) => {
                  return (
                    <tbody className={styles.tBody} key={index}>
                      <tr>
                        <td>
                          <p className={styles.textParagrap2}>{item.name}</p>
                        </td>
                        <td>
                          <p className={styles.textParagrap2}>
                            Php {item.default_price}
                          </p>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Button
                              className={styles.btnDelete}
                              onClick={() => handleDelete(item.id)}
                            >
                              Remove
                            </Button>
                            <Button
                              className={styles.btnEdit}
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </td>
                        {/* <ProductAvailability
                          availability={item.is_available}
                          id={item.id}
                        /> */}
                      </tr>
                    </tbody>
                  );
                })}
          </Table>
        </Form>
        {flavors?.length !== 0 ? (
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
                disabled={(!!flavors && flavors?.length) <= Math.max(0, end)}
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
          product={flavors}
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
  const [prevName, setPrevName] = useState("");
  const [prevPrice, setPrevPrice] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { getFlavorById, updateFlavor } = useFlavors();

  const loadFlavorById = async () => {
    const response = await getFlavorById(props.id);
    // *console.log("getRestaurantProduct response", response);
    setName(response.name);
    setPrice(response.default_price);
    setPrevName(response.name);
    setPrevPrice(response.default_price);
  };

  const handleSave = async () => {
    const data = {
      name: name,
      default_price: +price,
    };
    props.setEditModal(false);
    if (price !== prevPrice && name !== prevName) {
      const response = await updateFlavor(props.id, data);
      window.location.reload();
    } else if (name !== prevName) {
      const response = await updateFlavor(props.id, { name: name });
      window.location.reload();
    } else if (price !== prevPrice) {
      const response = await updateFlavor(props.id, { default_price: +price });
      window.location.reload();
    }
  };

  useEffect(() => {
    loadFlavorById();
  }, []);

  return (
    <Modal {...props} size="lg" className="mt-5">
      <Modal.Body className={styles.modalBody}>
        <Form>
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <Table className={styles.table}>
            <thead className={styles.tableHeader}>
              <Row>
                <Col>
                  <p>Flavor Name</p>
                </Col>
                <Col>
                  <p>Price</p>
                </Col>
                <Col>
                  <p>Action</p>
                </Col>
              </Row>
            </thead>
            <tbody className={styles.tableBody}>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    style={{ height: "100%" }}
                    type="text"
                    placeholder="Flavor Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    style={{ height: "100%" }}
                    type="text"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Row className={styles.buttonsContent}>
                    <Col>
                      <Button className={styles.buttons} onClick={props.onHide}>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button className={styles.buttons} onClick={handleSave}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </tbody>
          </Table>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FlavorContent;
