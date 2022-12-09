import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";

import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsReceivedAlt from "../../../assets/images/order-received-alt.png";
import statusIsPreparing from "../../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../../assets/images/delivered.png";

import styles from "./StatusContent.module.scss";
import Lottie from "lottie-react";
import updateSuccess from "../../../assets/update-success.json";

interface ContainerProps {}

type ForPreparingItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status?: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
  restaurant_address: string;
  total_amount: number;
};

const StatusContent: React.FC<ContainerProps> = ({}) => {
  const [status, setStatus] = useState<ForPreparingItem>();
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const { updateOrder, getOrdersById } = useOrder();
  const navigate = useNavigate();

  const [order, setOrder] = useState<ForPreparingItem | null>(null);

  // Get the params from the url
  const { id } = useParams();

  const loadReceivedOrder = async () => {
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);
    setStatus(response);
    setOrder(response);
  };

  const handleAccept = async (id: any) => {
    console.log(id);
    setUpdateModalShow(true)
    const response = await updateOrder(id, "preparing");
    // alert("updated status preparing successfully");
    // navigate("/account/for-delivery");
  };

  useEffect(() => {
    loadReceivedOrder();
  }, []);
  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              {/* <img src={statusIsReceived} alt="" />
              <p>Order Received</p> */}
              <div className={styles.imgContainer}>
                <img src={statusIsReceived} alt="" />
                {order?.order_status === "received" && (
                  <img
                    src={statusIsReceivedAlt}
                    alt=""
                    className={styles.altImg}
                  />
                )}
                <p>Order Received</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Kitchen Preparing ...</p>
            </div>
            <Button
              type="submit"
              onClick={() => handleAccept(status?.id)}
              className={styles.activateBtn}
            >
              Activate
            </Button>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsOtw} alt="" />
              <p>Rider on its way</p>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsDelivered} alt="" />
              <p>Delivered</p>
            </div>
          </Col>
        </Row>
      </div>
      <UpdateSuccessModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        setUpdateModalShow={setUpdateModalShow}
        updateModalShow={updateModalShow}
      />
    </div>
  );
};

const UpdateSuccessModal = (props: any) => {
  const {setUpdateModalShow, updateModalShow} = props;

  const handleClick = () => {
    setUpdateModalShow(false)
  }
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
            Updated status preparing successfully
          </p>

          <Link
            to="/account/for-delivery"
            onClick={handleClick}
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

export default StatusContent;
