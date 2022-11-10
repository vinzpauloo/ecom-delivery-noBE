import React, { useState } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
} from "react-bootstrap";

import styles from "./MenuContent.module.scss";
import SearchIcon from "../../../assets/images/search.png";
import ResetPassword from "../../../pages/Account/ResetPassword";

interface ContainerProps {}

function MenuModal(props: any) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title id="contained-modal-title-vcenter">Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
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
                  placeholder="Chinese Special Ramen"
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
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
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
                  placeholder="Php 130.00"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xs={8}>
              <Form.Label>Category</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className={styles.btnCategory}>
                  Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#action-1">Category1</Dropdown.Item>
                  <Dropdown.Item href="#action-2">Category2</Dropdown.Item>
                  <Dropdown.Item href="#action-3">Category3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Button className={styles.btnUpload}>Upload</Button>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xs={8}>
              <Form.Label>Cuisine</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className={styles.btnCuisine}>
                  Cuisine
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#action-1">Cuisine1</Dropdown.Item>
                  <Dropdown.Item href="#action-2">Cuisine2</Dropdown.Item>
                  <Dropdown.Item href="#action-3">Cuisine3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Form.Label>Availability</Form.Label>
              <Form.Check type="switch" />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center gap-2">
              <Button className={styles.btnDiscard} onClick={props.onHide}>
                Discard
              </Button>
              <Button className={styles.btnAddMenu}>Add Menu</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function EditModal(props: any) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title id="contained-modal-title-vcenter">Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
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
                  placeholder="Chinese Special Ramen"
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
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
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
                  placeholder="Php 130.00"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xs={8}>
              <Form.Label>Category</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className={styles.btnCategory}>
                  Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#action-1">Category1</Dropdown.Item>
                  <Dropdown.Item href="#action-2">Category2</Dropdown.Item>
                  <Dropdown.Item href="#action-3">Category3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Button className={styles.btnUpload}>Upload</Button>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xs={8}>
              <Form.Label>Cuisine</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className={styles.btnCuisine}>
                  Cuisine
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#action-1">Cuisine1</Dropdown.Item>
                  <Dropdown.Item href="#action-2">Cuisine2</Dropdown.Item>
                  <Dropdown.Item href="#action-3">Cuisine3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Form.Label>Availability</Form.Label>
              <Form.Check type="switch" />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center gap-2">
              <Button className={styles.btnDiscard} onClick={props.onHide}>
                Discard
              </Button>
              <Button className={styles.btnSaveMenu}>Save Menu</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function DeleteModal(props: any) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <h3 className={`d-flex justify-content-center ${styles.alert}`}>
          Are you sure you want to delete this menu?
        </h3>
        <Row>
          <Col className="d-flex justify-content-center gap-2">
            <Button className={styles.btnYes}>Yes</Button>
            <Button className={styles.btnNo}>No</Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

const MenuContent: React.FC<ContainerProps> = ({}) => {
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>Restaurant Menu</h3>
            </Col>
          </Row>
          {/* Button trigger modal */}
          <Row>
            <Col>
              <Button
                className={styles.btnAddMenu}
                onClick={() => setMenuModal(true)}
              >
                Add Menu
              </Button>
              <MenuModal show={menuModal} onHide={() => setMenuModal(false)} />
            </Col>
          </Row>
          <Row className="d-none d-lg-block">
            <Col>
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col>
          </Row>
          <Table>
            <thead className={styles.tHeader}>
              <tr>
                <th>
                  <p className={styles.textParagrap}>Name</p>
                </th>
                <th>
                  <p className={styles.textParagrap}>Description</p>
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
            <tbody className={styles.tBody}>
              <tr>
                <td>
                  <p className={styles.textParagrap2}>Title of the Food</p>
                </td>
                <td>
                  <p className={styles.textParagrap2}>Food Description</p>
                </td>
                <td>
                  <p className={styles.textParagrap2}>100 php</p>
                </td>
                <td>
                  <Form.Check type="switch" />
                </td>
                <td>
                  <div>
                    <Button
                      className={styles.btnEdit}
                      onClick={() => setEditModal(true)}
                    >
                      Edit
                    </Button>
                    <EditModal
                      show={editModal}
                      onHide={() => setEditModal(false)}
                    />
                    <Button
                      className={styles.btnDelete}
                      onClick={() => setDeleteModal(true)}
                    >
                      Delete
                    </Button>
                    <DeleteModal
                      show={deleteModal}
                      onHide={() => setDeleteModal(false)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Form>
      </div>
    </div>
  );
};

export default MenuContent;
