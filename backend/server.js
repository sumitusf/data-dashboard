import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;
const API_KEY = "2dbc9f8f5047be78a28226ade1496e7e"; // 

app.use(cors());

// Proxy endpoint
app.get("/api/fred", async (req, res) => {
  try {
    const { series_id } = req.query;
    const response = await axios.get(
      "https://api.stlouisfed.org/fred/series/observations",
      {
        params: {
          series_id,
          api_key: API_KEY,
          file_type: "json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
