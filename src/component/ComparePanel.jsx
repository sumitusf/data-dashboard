import React, { useState } from "react";
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
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  Checkbox,
  ListItemText,
} from "@mui/material";

export default function ComparePanel({
  series,
  regions,
  indicators,
  selectedStartYear,
  selectedEndYear,
}) {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [indicatorId, setIndicatorId] = useState("");
  const [yearRange, setYearRange] = useState([selectedStartYear, selectedEndYear]);

  // ✅ Get current indicator name
  const indicatorName =
    indicators.find((i) => i.id === indicatorId)?.name || "All Indicators";

  // ✅ Filter data by selected regions & indicator
  const filtered = series
    .filter(
      (s) =>
        (selectedRegions.length > 0 ? selectedRegions.includes(s.regionId) : true) &&
        (indicatorId ? s.indicatorId === indicatorId : true)
    )
    .map((s) => ({
      ...s,
      points: (s.points || []).filter((d) => {
        if (!d.date) return false;
        const year = new Date(d.date).getFullYear();
        return year >= yearRange[0] && year <= yearRange[1];
      }).map((d) => ({
        ...d,
        year: new Date(d.date).getFullYear(),
      })),
    }));

  // ✅ Combine data for chart
  let chartData = [];
  if (filtered.length > 0) {
    const years = [
      ...new Set(filtered.flatMap((s) => s.points.map((d) => d.year))),
    ].sort();

    chartData = years.map((year) => {
      const row = { year };
      filtered.forEach((s) => {
        const point = s.points.find((d) => d.year === year);
        const regionName = regions.find((r) => r.id === s.regionId)?.name || "";
        row[regionName] = point ? point.value : null;
      });
      return row;
    });
  }

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
      {/* ✅ Heading */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        Compare Panel
      </Typography>

      {/* ✅ Indicator Title */}
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: "secondary.main", fontWeight: 600 }}
      >
        {indicatorName} (by Year)
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* ✅ Multi-select counties */}
        <FormControl fullWidth>
          <InputLabel>Counties</InputLabel>
          <Select
            multiple
            value={selectedRegions}
            onChange={(e) => setSelectedRegions(e.target.value)}
            renderValue={(selected) =>
              regions
                .filter((r) => selected.includes(r.id))
                .map((r) => r.name)
                .join(", ")
            }
          >
            {regions.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                <Checkbox checked={selectedRegions.includes(r.id)} />
                <ListItemText primary={r.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ✅ Indicator dropdown */}
        <FormControl fullWidth>
          <InputLabel>Indicator</InputLabel>
          <Select
            value={indicatorId}
            onChange={(e) => setIndicatorId(e.target.value)}
          >
            <MenuItem value="">All Indicators</MenuItem>
            {indicators.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ✅ Year range slider */}
        <Typography variant="body2">Year Range</Typography>
        <Slider
          value={yearRange}
          onChange={(_, newValue) => setYearRange(newValue)}
          valueLabelDisplay="auto"
          min={selectedStartYear}
          max={selectedEndYear}
        />
      </Box>

      {/* Chart */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="year" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip
              labelFormatter={(year) => `Year: ${year}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            />
            <Legend />
            {filtered.map((s, idx) => {
              const regionName =
                regions.find((r) => r.id === s.regionId)?.name ||
                `Region ${idx + 1}`;
              return (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={regionName}
                  stroke={["#006747", "#C69214", "#5B6770", "#8884d8"][idx % 4]} // USF colors + fallback
                  strokeWidth={2}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No data available for the selected filters.
        </Typography>
      )}
    </Paper>
  );
}
