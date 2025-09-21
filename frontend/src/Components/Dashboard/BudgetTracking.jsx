import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#2563eb", // Infrastructure
  "#10b981", // Education
  "#ef4444", // Health
  "#f59e0b", // Agriculture
  "#8b5cf6", // Administration
  "#f97316", // Disaster Relief
  "#6b7280", // Others
];

const breakdownData = [
  { name: "Infrastructure", value: 120_000_000 },
  { name: "Education", value: 45_000_000 },
  { name: "Health", value: 35_000_000 },
  { name: "Agriculture", value: 28_000_000 },
  { name: "Administration", value: 18_000_000 },
  { name: "Disaster Relief", value: 6_000_000 },
  { name: "Others", value: 8_000_000 },
];

const yearlyData = [
  {
    year: "2022/23",
    Infrastructure: 95_000_000,
    Education: 40_000_000,
    Health: 30_000_000,
    Agriculture: 22_000_000,
    Administration: 15_000_000,
    "Disaster Relief": 4_000_000,
    Others: 6_000_000,
  },
  {
    year: "2023/24",
    Infrastructure: 110_000_000,
    Education: 42_000_000,
    Health: 33_000_000,
    Agriculture: 25_000_000,
    Administration: 17_000_000,
    "Disaster Relief": 5_000_000,
    Others: 7_000_000,
  },
  {
    year: "2024/25",
    Infrastructure: 120_000_000,
    Education: 45_000_000,
    Health: 35_000_000,
    Agriculture: 28_000_000,
    Administration: 18_000_000,
    "Disaster Relief": 6_000_000,
    Others: 8_000_000,
  },
];

const formatNPR = (val) => {
  if (val === undefined || val === null) return "-";
  return val.toLocaleString("en-IN");
};

const BudgetTracking = () => {
  const total = breakdownData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        Tillotama Municipality — Budget Overview
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-medium">
              Budget Breakdown
            </h2>
            <p className="text-sm text-gray-500">
              Total Annual Budget • {formatNPR(total)}
            </p>
          </div>

          <div className="w-full h-[300px] sm:h-[320px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={breakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={56}
                  paddingAngle={4}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {breakdownData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ReTooltip formatter={(value) => formatNPR(value)} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-15 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {breakdownData.map((d, i) => (
              <div
                key={d.name}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      background: COLORS[i],
                      borderRadius: 3,
                    }}
                  />
                  <span className="font-medium">{d.name}</span>
                </div>
                <span className="text-gray-500">{formatNPR(d.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-medium">
              Budget — Yearly Comparison
            </h2>
            <p className="text-sm text-gray-500">
              Comparison across fiscal years (NPR)
            </p>
          </div>

          <div className="w-full h-[320px] sm:h-[360px]">
            <ResponsiveContainer>
              <BarChart
                data={yearlyData}
                margin={{ top: 10, right: 16, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
                />
                <ReTooltip formatter={(value) => formatNPR(value)} />
                <Legend verticalAlign="bottom" wrapperStyle={{ bottom: -8 }} />
                {breakdownData.map((d, i) => (
                  <Bar
                    key={d.name}
                    dataKey={d.name}
                    stackId="a"
                    fill={COLORS[i]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracking;
