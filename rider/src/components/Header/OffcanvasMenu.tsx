import React, { useState } from "react";
import { List } from "react-bootstrap-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

import styles from "./OffcanvasMenu.module.scss";

interface ContainerProps {}

const OffcanvasMenu: React.FC<ContainerProps> = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a className="me-2" onClick={handleShow}>
        <div className={styles.burger}>
          <List color="#61481C" size={24} />
        </div>
      </a>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body>
          <ul className={styles.menu}>
            <li>
              <Link to="/account" onClick={handleClose}>
                Login
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleClose}>
                Logout
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasMenu;
