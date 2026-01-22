import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function CarbonReductionChart() {
  const data = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    datasets: [
      {
        label: "CO₂ Saved (kg)",
        data: [2.5, 3.1, 3.8, 4.2, 4.9, 5.5, 6.2],
        borderColor: "#22c55e", // green line
        backgroundColor: "rgba(34,197,94,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.formattedValue} kg CO₂ saved`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CO₂ Saved (kg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Weeks",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Carbon Emission Reduction</h3>
      <Line data={data} options={options} height={150} />
    </div>
  );
}
