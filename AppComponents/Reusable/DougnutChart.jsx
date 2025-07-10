"use client";
import React from "react";
import PropTypes from "prop-types";

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

const DougnutChart = ({ acc }) => {
  const names = acc.map((item) => item.name);
  const currentBalances = acc.map((item) => item.currentBalance);
  const data = {
    datasets: [
      {
        label: "Accounts",
        data: currentBalances,
        backgroundColor: ["#FF8A00", "#FC8000", "#FFF80C"],
      },
    ],

    labels: names,
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            position: "bottom",
            display: true,
          },
        },
      }}
    />
  );
};
DougnutChart.propTypes = {
  acc: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      currentBalance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DougnutChart;
