import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper } from "@mui/material";

export default function IndicatorChart({ data, indicators }) {
  if (!data || !data.length) return <p>No chart data available</p>;

  const indicatorName =
    indicators.find((i) => i.id === data[0].indicatorId)?.name || "";

  // ✅ Aggregate monthly points into yearly averages
  const yearlyData = {};
  (data[0].points || []).forEach((d) => {
    if (!d.date) return; // skip invalid
    const year = new Date(d.date).getFullYear();
    if (!yearlyData[year]) {
      yearlyData[year] = { year, total: 0, count: 0 };
    }
    yearlyData[year].total += Number(d.value) || 0;
    yearlyData[year].count += 1;
  });

  const rows = Object.values(yearlyData).map((y) => ({
    year: y.year,
    value: y.total / y.count, // average per year
  }));

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {indicatorName} (Chart)
      </Typography>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            labelFormatter={(year) => `Year: ${year}`}
            formatter={(val) => val.toFixed(2)}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#006747" // USF Green
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
