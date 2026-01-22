import React from "react";

export default function EnergyMetrics() {
  // Static demo data — can be replaced later with API data
  const metrics = [
    {
      title: "Predicted Power",
      value: "720 W",
      change: "+3.2%",
      color: "text-green-600",
      bg: "bg-green-50",
      icon: "⚡",
    },
    {
      title: "Actual Power",
      value: "740 W",
      change: "-1.4%",
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "💡",
    },
    {
      title: "CO₂ Saved",
      value: "8.5%",
      change: "+0.6%",
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: "🌱",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-5 rounded-2xl shadow bg-white hover:shadow-md transition`}
        >
          <div>
            <p className="text-sm text-gray-500">{metric.title}</p>
            <h2 className={`text-2xl font-bold ${metric.color}`}>
              {metric.value}
            </h2>
            <p className="text-xs text-gray-400 mt-1">{metric.change} from last day</p>
          </div>
          <div
            className={`text-3xl ${metric.bg} rounded-full p-3`}
            title={metric.title}
          >
            {metric.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
