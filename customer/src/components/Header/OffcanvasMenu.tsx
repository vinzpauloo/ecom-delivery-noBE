import React, { useState } from "react";
import { List } from "react-bootstrap-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useIsAuthenticated } from "react-auth-kit";

import styles from "./OffcanvasMenu.module.scss";

interface ContainerProps {}

const OffcanvasMenu: React.FC<ContainerProps> = ({}) => {
  const [show, setShow] = useState(false);
  const { logout } = useLogout();
  const isAuthenticated = useIsAuthenticated();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };

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
              {isAuthenticated() ? (
                <Link to="#" onClick={handleLogout}>
                  Log out
                </Link>
              ) : (
                <Link to="/login" onClick={handleClose}>
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasMenu;
