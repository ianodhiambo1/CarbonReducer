import React from "react";

export default function EnergyLogsTable() {
  const data = [
    {
      time: "2025-11-01 09:00",
      actual: 620.4,
      predicted: 605.8,
      carbon_saved: 0.32,
    },
    {
      time: "2025-11-01 09:30",
      actual: 590.7,
      predicted: 584.5,
      carbon_saved: 0.28,
    },
    {
      time: "2025-11-01 10:00",
      actual: 610.1,
      predicted: 598.9,
      carbon_saved: 0.34,
    },
    {
      time: "2025-11-01 10:30",
      actual: 580.6,
      predicted: 572.3,
      carbon_saved: 0.30,
    },
    {
      time: "2025-11-01 11:00",
      actual: 640.8,
      predicted: 623.5,
      carbon_saved: 0.35,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Energy Consumption Logs</h3>
      <table className="min-w-full border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="py-3 px-4 text-left">Timestamp</th>
            <th className="py-3 px-4 text-left">Actual (W)</th>
            <th className="py-3 px-4 text-left">Predicted (W)</th>
            <th className="py-3 px-4 text-left">CO₂ Saved (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              <td className="py-2 px-4">{row.time}</td>
              <td className="py-2 px-4">{row.actual.toFixed(1)}</td>
              <td className="py-2 px-4">{row.predicted.toFixed(1)}</td>
              <td className="py-2 px-4 text-green-600">
                {row.carbon_saved.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
