import React from "react";
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

function Chart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Deliveries",
        data: [100, 300, 400, 200, 600, 500, 50],
        backgroundColor: "#61481C",
        barPercentage: 0.5,
        barThickness: 30,
        maxBarThickness: 30,
        minBarLength: 2,
      },
    ],
  };

  return (
    <>
      <div>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default Chart;
