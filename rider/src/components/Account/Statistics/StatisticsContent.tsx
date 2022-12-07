import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  Form,
  Collapse,
  ProgressBar,
  Modal,
  ModalBody,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./StatisticsContent.module.scss";

//Chart
// import Chart from "./Chart";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios, { AxiosError } from "axios";

interface ContainerProps {}

const StatisticsContent: React.FC<ContainerProps> = ({}) => {
  const navigate = useNavigate();

  const navigateToDelivery = () => {
    navigate("/account/for-delivery");
  };

  const handleClickBack = () => {
    navigate(`/account/rewards`);
  };

  //Chart
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const monthlyLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const weeklyLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const dailyLabels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
  ];

  const [data, setData] = useState({
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly",
        data: [50, 400, 600, 100, 300, 200, 500],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });

  const [weeklyData, setWeeklyData] = useState({
    labels: weeklyLabels,
    datasets: [
      {
        label: "Weekly",
        data: [35, 5, 20, 10, 25, 15, 30],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });

  const [dailyData, setDailyData] = useState({
    labels: dailyLabels,
    datasets: [
      {
        label: "Daily",
        data: [10, 5, 3, 25, 15, 7],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });

  function DailyModal(props: any) {
    return (
      <Modal {...props} size="lg" aria-labelledby="">
        {/* <Modal.Header closeButton className="px-4">
          <Modal.Title id="" className="ms-auto">
            Rider On Its Way
          </Modal.Title>
        </Modal.Header> */}
        <ModalBody className={`p-1`}>
          <Bar
            data={dailyData}
            height="600px"
            width="10px"
            options={{ maintainAspectRatio: false }}
          />
        </ModalBody>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  function WeeklyModal(props: any) {
    return (
      <Modal {...props} size="lg" aria-labelledby="">
        {/* <Modal.Header closeButton className="px-4">
          <Modal.Title id="" className="ms-auto">
            Rider On Its Way
          </Modal.Title>
        </Modal.Header> */}
        <ModalBody className={`p-1`}>
          <Bar
            data={weeklyData}
            height="600px"
            width="10px"
            options={{ maintainAspectRatio: false }}
          />
        </ModalBody>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={9} md={8}>
          <p>My Statistics</p>
        </Col>
        <Col xs={3} md={2}>
          <Button className={styles.statsBtn} onClick={handleClickBack}>
            Go Back
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="mt-5">
          <Bar
            data={data}
            height="400px"
            width="300px"
            options={{ maintainAspectRatio: false }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Col>
            <div className="d-flex justify-content-center align-content-center align-items-center mt-5 gap-5">
              <Button
                style={{
                  width: "150px",
                  height: "34px",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                  backgroundColor: "#d9d9d9",
                  border: "1px solid #8E8E8E",
                  color: "black",
                  borderRadius: "5px",
                  fontWeight: "700",
                }}
                onClick={() => setShowModal1(true)}
              >
                Daily
              </Button>
              <DailyModal
                show={showModal1}
                onHide={() => setShowModal1(false)}
              />
              <Button
                style={{
                  width: "150px",
                  height: "34px",
                  lineHeight: "12px",
                  textTransform: "uppercase",
                  backgroundColor: "#d9d9d9",
                  border: "1px solid #8E8E8E",
                  color: "black",
                  borderRadius: "5px",
                  fontWeight: "700",
                }}
                onClick={() => setShowModal2(true)}
              >
                Weekly
              </Button>
              <WeeklyModal
                show={showModal2}
                onHide={() => setShowModal2(false)}
              />
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsContent;
