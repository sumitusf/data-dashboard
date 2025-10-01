import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function IndicatorTable({ data, indicators }) {
  if (!data.length) return null;

  const indicatorName =
    indicators.find((i) => i.id === data[0].indicatorId)?.name || "";

  const rows = (data[0].points || []).slice(0, 15);

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {indicatorName} (Table)
      </Typography>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Metric
              </TableCell>
              {rows.map((row, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {new Date(row.date).getFullYear()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>
                Value
              </TableCell>
              {rows.map((row, idx) => (
                <TableCell key={idx} align="center">
                  {row.value}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
