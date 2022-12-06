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
        <hr />
        <Col>
          <Bar data={dailyData} />
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsContent;
