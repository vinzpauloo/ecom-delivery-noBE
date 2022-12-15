import React, { useState, useEffect, useRef } from "react";
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

import { useStatistics } from "../../../hooks/useStatistics";

//ChartJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ContainerProps {}

const StatisticsContent: React.FC<ContainerProps> = ({}) => {
  const { getDailyStatistics, getWeeklyStatistics, getMonthlyStatistics } =
    useStatistics();

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(`/account/rewards`);
  };

  const loadDailyStatistics = async (status: string) => {
    const params = { status: status };
    const response = await getDailyStatistics(params);
    // console.log("getDailyStatistics", response);
    // console.log(data);
    setData({
      labels: Object.keys(response),
      datasets: [
        {
          ...data.datasets[0],
          data: Object.values(response),
        },
      ],
    });
  };

  const loadWeeklyStatistics = async (status: string) => {
    const params = { status: status };
    const response = await getWeeklyStatistics(params);
    // console.log("getWeeklyStatistics", response);
    // console.log(data2);
    setData2({
      labels: Object.keys(response),
      datasets: [
        {
          ...data2.datasets[0],
          data: Object.values(response),
        },
      ],
    });
  };

  const loadMonthlyStatistics = async (status: string) => {
    const params = { status: status };
    const response = await getMonthlyStatistics(params);
    // console.log("getMonthlyStatistics", response);
    // console.log(data1);
    setData1({
      labels: Object.keys(response),
      datasets: [
        {
          ...data1.datasets[0],
          data: Object.values(response),
        },
      ],
    });
  };

  useEffect(() => {
    loadDailyStatistics("daily");
    loadWeeklyStatistics("weekly");
    loadMonthlyStatistics("monthly");
  }, []);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  //ChartJS start
  const labels: any = []; //Do not remove

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Daily",
        data: [],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });

  const [data1, setData1] = useState({
    labels: labels,
    datasets: [
      {
        label: "Monthly",
        data: [],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: labels,
    datasets: [
      {
        label: "Weekly",
        data: [],
        backgroundColor: ["#61481C"],
        borderColor: ["#61481C"],
        borderWidth: 1,
      },
    ],
  });
  //ChartJS End

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
            data={data}
            height="400px"
            width="300px"
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
            data={data2}
            height="400px"
            width="300px"
            options={{ maintainAspectRatio: false }}
          />
        </ModalBody>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

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
            data={data1}
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
