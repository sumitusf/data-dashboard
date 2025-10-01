import axios from "axios";

// fetch one series from backend
export const fetchSeriesFromFRED = async (seriesId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/fred?series_id=${seriesId}`
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch series:", seriesId, err);
    return null;
  }
};

// fetch all regions + indicators + their data
export const fetchAll = async () => {
  // Load mapping JSON from public/
  const res = await fetch("/data/series-map.json");
  const mappings = await res.json();

  // Build unique regions
  const regions = [
    ...new Map(mappings.map(m => [m.county, { id: m.county, name: m.county }]))
      .values(),
  ];

  // Build unique indicators
  const indicators = [
    ...new Map(
      mappings.map(m => [m.indicator, { id: m.indicator, name: m.indicator }])
    ).values(),
  ];

  // Fetch all series
  const series = [];
  for (const m of mappings) {
    const data = await fetchSeriesFromFRED(m.series_id);
    if (data) {
      series.push({
        regionId: m.county,
        indicatorId: m.indicator,
        points: (data.observations || []).map(obs => ({
          date: obs.date,
          value: isNaN(parseFloat(obs.value)) ? null : parseFloat(obs.value),
        })),
      });
    }
  }

  return { regions, indicators, series };
};
