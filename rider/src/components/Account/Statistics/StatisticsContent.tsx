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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const [data, setData] = useState({
    labels: labels,
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
    labels: labels,
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
        {/* <Chart />
        <Chart />
        <Chart /> */}
        <Col>
          <Bar data={data} />
        </Col>
        <hr />
        <Col>
          <Bar data={weeklyData} />
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsContent;
