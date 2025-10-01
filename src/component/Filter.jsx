import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

export default function Filter({
  regions,
  indicators,
  selectedRegion,
  setSelectedRegion,
  selectedIndicator,
  setSelectedIndicator,
  selectedStartYear,
  setSelectedStartYear,
  selectedEndYear,
  setSelectedEndYear,
}) {
  // Generate year options (e.g., 2000–2025)
  const years = Array.from({ length: 30 }, (_, i) => 2000 + i);

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {/* Region Dropdown */}
      <TextField
        select
        label="Region"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        style={{ minWidth: 180 }}
      >
        <MenuItem value="">All Regions</MenuItem>
        {regions.map((r) => (
          <MenuItem key={r.id} value={r.id}>
            {r.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Indicator Dropdown */}
      <TextField
        select
        label="Indicator"
        value={selectedIndicator}
        onChange={(e) => setSelectedIndicator(e.target.value)}
        style={{ minWidth: 220 }}
      >
        <MenuItem value="">All Indicators</MenuItem>
        {indicators.map((i) => (
          <MenuItem key={i.id} value={i.id}>
            {i.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Start Year Dropdown */}
      <TextField
        select
        label="Start Year"
        value={selectedStartYear}
        onChange={(e) => setSelectedStartYear(Number(e.target.value))}
        style={{ minWidth: 120 }}
      >
        {years.map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </TextField>

      {/* End Year Dropdown */}
      <TextField
        select
        label="End Year"
        value={selectedEndYear}
        onChange={(e) => setSelectedEndYear(Number(e.target.value))}
        style={{ minWidth: 120 }}
      >
        {years.map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
