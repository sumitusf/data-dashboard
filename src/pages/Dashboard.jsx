import React, { useEffect, useState } from "react";
import { fetchAll } from "../api";
import Filter from "../component/Filter";
import IndicatorChart from "../component/IndicatorChart";
import IndicatorTable from "../component/IndicatorTable";
import ComparePanel from "../component/ComparePanel";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from "@mui/material";

export default function Dashboard() {
  const [regions, setRegions] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [selectedStartYear, setSelectedStartYear] = useState(2010);
  const [selectedEndYear, setSelectedEndYear] = useState(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const { regions, indicators, series } = await fetchAll();
        setRegions(regions);
        setIndicators(indicators);
        setSeries(series);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading data...</p>;

  // ✅ Normalize to points filtered by year
  const filteredSeries = series
    .filter(
      (s) =>
        (selectedRegion ? s.regionId === selectedRegion : true) &&
        (selectedIndicator ? s.indicatorId === selectedIndicator : true)
    )
    .map((s) => ({
      ...s,
      points: (s.points || s.data || []).filter((d) => {
        if (!d.date) return false;
        const year = new Date(d.date).getFullYear();
        return year >= selectedStartYear && year <= selectedEndYear;
      }),
    }));

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
      {/* 🔹 Fixed Header with Navigation */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#003366", 
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            County Indicators Dashboard
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() =>
                document
                  .getElementById("chart-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Chart
            </Button>
            <Button
              color="inherit"
              onClick={() =>
                document
                  .getElementById("table-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Table
            </Button>
            <Button
              color="inherit"
              onClick={() =>
                document
                  .getElementById("compare-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Compare
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔹 Offset to prevent content hiding under fixed AppBar */}
      <Toolbar />

      {/* 🔹 Page Content */}
      <Grid container spacing={2} sx={{ height: "100%", px: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Page Heading */}
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#003366", fontWeight: "bold" }}
              >
                County Indicators Dashboard
              </Typography>
            </Paper>

            {/* Full-width Filters */}
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#003366", fontWeight: "bold" }}
              >
                Filters
              </Typography>
              <Filter
                regions={regions}
                indicators={indicators}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedIndicator={selectedIndicator}
                setSelectedIndicator={setSelectedIndicator}
                selectedStartYear={selectedStartYear}
                setSelectedStartYear={setSelectedStartYear}
                selectedEndYear={selectedEndYear}
                setSelectedEndYear={setSelectedEndYear}
              />
            </Paper>

            {/* Chart */}
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }} id="chart-section">
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#003366", fontWeight: "bold" }}
              >
                Chart
              </Typography>
              <IndicatorChart data={filteredSeries} indicators={indicators} />
            </Paper>

            {/* Table */}
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }} id="table-section">
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#C69214", fontWeight: "bold" }} // USF Gold
              >
                Data Table
              </Typography>
              <IndicatorTable data={filteredSeries} indicators={indicators} />
            </Paper>

            {/* Compare */}
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }} id="compare-section">
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#5B6770", fontWeight: "bold" }} // USF Grey
              >
                Compare Panel
              </Typography>
              <ComparePanel
                series={series}
                regions={regions}
                indicators={indicators}
                selectedStartYear={selectedStartYear}
                selectedEndYear={selectedEndYear}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
