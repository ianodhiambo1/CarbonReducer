import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ApplianceUsageChart() {
  const data = {
    labels: [
      "Fridge",
      "Washing Machine",
      "Dishwasher",
      "TV",
      "Lighting",
      "Heater",
      "Kettle",
    ],
    datasets: [
      {
        label: "Average Daily Power (kWh)",
        data: [2.8, 1.5, 1.2, 0.9, 0.7, 3.5, 1.0],
        backgroundColor: [
          "#3b82f6", // blue
          "#22c55e", // green
          "#f97316", // orange
          "#e11d48", // pink-red
          "#a855f7", // purple
          "#f59e0b", // amber
          "#06b6d4", // cyan
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bars
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.formattedValue} kWh`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Power (kWh)",
        },
      },
      y: {
        ticks: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Average Daily Appliance Power Usage
      </h3>
      <Bar data={data} options={options} height={150} />
    </div>
  );
}
