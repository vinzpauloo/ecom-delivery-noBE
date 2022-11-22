import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import styles from "./NewAddress.module.scss";

interface ContainerProps {
  newAddress: string;
  setNewAddress: React.Dispatch<React.SetStateAction<string>>;
  isNewAddress: boolean;
  setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAddress: React.FC<ContainerProps> = ({
  newAddress,
  setNewAddress,
  isNewAddress,
  setIsNewAddress,
}) => {
  const handleOnClick = () => {
    console.log("Confirming new address ...");
  };

  const handleUseNewAddress = () => {
    setIsNewAddress(!isNewAddress);
  };

  return (
    <div className={styles.container}>
      <h4>New Address</h4>

      <Form className={styles.form}>
        <Row xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Enter Address</Form.Label>
              <Form.Control
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="d-flex justify-content-between align-items-center">
              <div
                className={`d-flex justify-content-center gap-4 ${styles.checkbox}`}
              >
                <Form.Check
                  type="checkbox"
                  id="address_this_new"
                  label="Use this Address"
                  checked={isNewAddress}
                  onChange={handleUseNewAddress}
                />
              </div>

              <Button variant="primary" type="submit" onClick={handleOnClick}>
                Confirm new address
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewAddress;
