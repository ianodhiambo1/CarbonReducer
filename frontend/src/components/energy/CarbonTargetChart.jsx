import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function CarbonTargetChart() {
  // Static demo data — represents daily totals vs target
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        type: "bar",
        label: "Energy Used (kWh)",
        data: [12.4, 11.8, 13.2, 14.5, 13.9, 12.7, 11.5],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // blue
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Target (kWh)",
        data: [13, 13, 13, 13, 13, 13, 13],
        borderColor: "#f59e0b", // amber
        borderWidth: 2,
        pointBackgroundColor: "#f59e0b",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Energy (kWh)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Weekly Energy Usage vs Target
      </h3>
      <Bar data={data} options={options} height={100} />
    </div>
  );
}
